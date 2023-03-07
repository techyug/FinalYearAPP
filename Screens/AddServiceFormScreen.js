import { Text, View,TextInput, Image, Pressable, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../Redux/actions';
import Ionicons from '@expo/vector-icons/Ionicons';
import Axios from 'axios'
import { serverIP } from '../Constants/IPofBackned';
import { Button } from 'react-native';
import * as Location from 'expo-location';


const AddServiceFormScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData)


    const [super_cat, setSuperCat] = useState([])
    const [selectedSuperCat, setselectedSuperCat] = useState({ super_cat_id: 0 });
    const [servicesUnderSelectedCat, setservicesUnderSelectedCat] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [move, setMove] = useState(false)
    const [ProviderLocation, setProviderLocation] = useState({ "coords": { "accuracy": 0, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 0.0000000, "longitude": 0.000000, "speed": 0 }, "mocked": false, "timestamp": 0 })
    const [readableLocation, setreadableLocation] = useState(null)
    const [IsSerivceRequestSucces, setIsSerivceRequestSucces] = useState(false)
    

    const [loaded, setloaded] = useState(false)
    const onRefresh = () => {
        setloaded(false)
        setloadedAssignedServices(false)
    }

    useEffect(() => {

        if (super_cat.length < 1) {
            Axios.get(serverIP + '/super').then(res => {
                setSuperCat(res.data)
                setselectedSuperCat(res.data[0])
            }).catch(e => console.log(e))
        }

        if (!loaded) {
            Axios.get(serverIP + '/services/' + selectedSuperCat?.super_cat_id).then(res => {
                setservicesUnderSelectedCat(res.data)
                setloaded(true)
            }).catch(e => {
                console.log(e)
                dispatch(updateInfo({ msg: e.toString(), show: true, infoType: "Error" }));
                setloaded(true)
            })
        }

    }, [selectedSuperCat, loaded])
    const moveNext = () => {
        setMove(true)

    }
    const AddServicewithProvider = () => {
        setloaded(false)
        Axios.post(serverIP + '/add-service-to-provider', { selectedService: selectedService, userData: userData, ServiceLocation: ProviderLocation, ReadableServiceLocation: readableLocation }).
            then((res) => {
                let resp = res.data.toString();
                if (resp.includes('Duplicate')) {
                    dispatch(updateInfo({ msg: "Service Already Added", show: true, infoType: "Error" }));
                    setloaded(true)
                } else if (resp.includes('Added')) {
                    setloaded(true)
                    setIsSerivceRequestSucces(true);
                    dispatch(updateInfo({ msg: resp, show: true, infoType: "Success" }));
                }
                else {
                    dispatch(updateInfo({ msg: resp, show: true, infoType: "Error" }));
                    setloaded(true)
                }
            }).catch((err) => {
                dispatch(updateInfo({ msg: err.toString(), show: true, infoType: "Error" }));
                console.log(err)
                setloaded(true)
            })
    }
    const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    const AddServiceForm = () =>
        <>
            <ScrollView style={{ flexDirection: 'row' }} horizontal >
                {
                    super_cat.map((item, index) => (
                        <Pressable onPress={() => {
                            setselectedSuperCat(item)
                            setloaded(false)
                        }} key={index} style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderColor: selectedSuperCat.super_cat_id === item.super_cat_id ? 'blue' : 'white', elevation: 5, borderWidth: 2, margin: 3, borderRadius: 10 }} >
                            <Image source={{ uri: item.icon }} style={{ height: 30, width: 30 }} />
                            <Text>{item.super_cat_title}</Text>

                        </Pressable>
                    ))
                }
                <Pressable style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,50,255,1)', elevation: 7, margin: 3, borderRadius: 10 }}  >
                    <Ionicons name='add-circle-outline' size={20} color='white' />
                    <Text style={{ color: 'white' }}>Request to Add more Services</Text>
                </Pressable>

            </ScrollView>
            <ServicesList/>

        </>

    const ServicesList = () => (
        <>
            <ScrollView style={{ height: 200, zIndex: 10 }} contentContainerStyle={{ padding: 5 }}
                refreshControl={
                    <RefreshControl refreshing={!loaded} onRefresh={onRefresh} title="Loading" />
                }
            >
                {servicesUnderSelectedCat.map((item, index) => (
                    <Pressable onPress={() => {
                        if (selectedService === null) {
                            setSelectedService(item)
                        }
                        else if (selectedService === item) {
                            setSelectedService(null)
                        }
                        else setSelectedService(item)
                    }}
                        key={index} style={{ flexDirection: 'row', padding: 10, backgroundColor: 'white', marginBottom: 5, borderRadius: 10, elevation: 7, alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: selectedService === item ? 'green' : 'white' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{ uri: item.service_img }} style={{ height: 30, width: 30, marginEnd: 20 }} />
                            <Text>{item.service_title}</Text>
                        </View>
                        <Ionicons name='checkmark-circle' style={{ display: selectedService === item ? 'flex' : 'none' }} size={20} color='green' />
                    </Pressable>
                ))}
            </ScrollView>
            <View style={{ width:'100%',borderTopWidth: 1, borderColor: 'lightgray' }}>
                {
                    selectedService === null ?
                        (<Pressable style={{ flexDirection: 'row', width: 200, alignSelf: 'center', padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', elevation: 7, margin: 3, borderRadius: 10 }}  >
                            <Ionicons name='add-circle-outline' size={20} color='white' />
                            <Text style={{ color: 'white' }}>Add more Services</Text>
                        </Pressable>
                        ) : (
                            <Pressable onPress={moveNext} style={{ flexDirection: 'row', width: 200, alignSelf: 'center', padding: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,50,255,1)', elevation: 7, margin: 3, borderRadius: 10 }} >
                                <Text style={{ color: 'white', marginEnd: 5 }}>Send for Approval</Text>
                                <Ionicons name='arrow-forward-circle' color={'white'} size={20} />
                            </Pressable>
                        )
                }
            </View>
        </>
    )

    const GetLocation = async()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Location","Please allow location to use this feature")
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setProviderLocation(location)
        let resp = await Location.reverseGeocodeAsync(location.coords)
        setreadableLocation(resp[0])
    }
    return (
        <View style={{flex:1,padding:10}}>
            <View style={{ backgroundColor:'white',elevation:8,borderRadius:10,padding:7 }}>
                {
                    !move ?
                        <View>
                            <AddServiceForm />
                           
                        </View>
                        :
                        <View>
                            <TextInput placeholder='Latitude' value={ProviderLocation.coords.latitude.toString()} style={{padding:10,borderWidth:1,borderRadius:10,margin:3}}/>
                            <TextInput placeholder='Longitude' value={ProviderLocation.coords.longitude.toString()} style={{padding:10,borderWidth:1,borderRadius:10,margin:3}}/>
                            {
                                readableLocation!==null &&
                                <Text>Pincode : { readableLocation.region +" "+readableLocation.postalCode} </Text>
                            }
                            <Button title='Fetch my Location' onPress={GetLocation} />
                            <View style={{ flexDirection: 'row',justifyContent:'space-around',marginTop:20  }}>
                                <Pressable onPress={() => setMove(false)} style={{ flexDirection: 'row', backgroundColor: 'white', padding: 5, elevation: 5 ,borderRadius:10}}>
                                    <Ionicons name='arrow-back' size={20} />
                                    <Text>Back</Text>
                                </Pressable>
                                <Pressable disabled={readableLocation===null} onPress={AddServicewithProvider} style={{ flexDirection: 'row', backgroundColor: readableLocation===null?'lightgray':'green', padding: 5, elevation: 5,borderRadius:10 }}>
                                    <Text style={{ color: 'white' }}>Submit</Text>
                                    <Ionicons name='checkmark-circle' size={20} color="white" />
                                </Pressable>
                            </View>
                        </View>
                }
            </View>
        </View>
    )
}

export default AddServiceFormScreen