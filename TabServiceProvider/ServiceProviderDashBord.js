import { StatusBar, StyleSheet, Text, Alert, TextInput, View, Button, Image, Pressable, ScrollView, RefreshControl, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo, userLogout } from '../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Axios from 'axios'
import * as Location from 'expo-location';
import { serverIP } from '../Constants/IPofBackned';
import { Icon, Input, ThemeProvider } from 'react-native-elements';
const ud = { "CreatedAt": "2023-03-01T10:54:51.000Z", "ProviderStatus": "New Provider", "ServiceAddress": "{\"postalCode\":\"261121\",\"country\":\"India\",\"isoCountryCode\":\"IN\",\"subregion\":\"Lucknow Division\",\"city\":\"Fazilpur\",\"street\":null,\"district\":null,\"name\":\"PPMX+3PF\",\"streetNumber\":null,\"region\":\"Uttar Pradesh\",\"timezone\":null}", "ServiceLatitude": "27.735472", "ServiceLongitude": "80.750369", "ServicePincode": 261121, "ServiceProvideName": "Yogendra singh", "ServiceProviderEmail": "moralfun0@gmail.com", "ServiceProviderId": 2, "ServiceProviderIdinMap": 2, "ServiceProviderImage": "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png", "ServiceProviderPassword": "567890", "ServiceProviderPhone": "8429582215", "ServiceStatus": "Requested for approval", "msg": "Login Success", "role": "Service Provider", "service_description": "All type of Camera operators", "service_id": 1, "service_img": "https://img.freepik.com/free-vector/videographer-concept-illustration_114360-1439.jpg", "service_title": "Camera man", "super_cat_id": 2 }

const ServiceProviderDashBord = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData)
  const [dataofServicesbyapi,setdataofServicesbyapi] = useState([])
  const [loadedAssignedServices,setloadedAssignedServices] = useState(false)
  const [profileOpen, setprofileOpen] = useState(false)
  const [super_cat, setSuperCat] = useState([])
  const [selectedSuperCat, setselectedSuperCat] = useState({ super_cat_id: 0 });
  const [servicesUnderSelectedCat, setservicesUnderSelectedCat] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [move, setMove] = useState(false)
  const [ProviderLocation, setProviderLocation] = useState({ "coords": { "accuracy": 0, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 0.0000000, "longitude": 0.000000, "speed": 0 }, "mocked": false, "timestamp": 0 })
  const [readableLocation, setreadableLocation] = useState(null)
  const [IsSerivceRequestSucces, setIsSerivceRequestSucces] = useState(false)

  const userLogoutConstant = () => {
    dispatch(userLogout());
    AsyncStorage.removeItem('@userData');
    navigation.replace('Login')
  }
  const [loaded, setloaded] = useState(false)
  const onRefresh = () => {
    setloaded(false)
    setloadedAssignedServices(false)
  }
  if(!loadedAssignedServices){
    Axios.get(serverIP+'/services-of-provider/'+userData.ServiceProviderId).then(res=>{
      setdataofServicesbyapi(res.data)
      setloadedAssignedServices(true)
    }).catch(e=>{
      setloadedAssignedServices(true)
      dispatch(updateInfo({ msg: e.toString(), show: true, infoType: "Error" }));
    })
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
      <Text style={{ fontSize: 20, fontWeight: 900, color: 'blue' }}>Add a Service----------------</Text>
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

    </>

  const ServicesList = () => (
    <>
      <ScrollView style={{ height: 200,zIndex:10 }} contentContainerStyle={{ padding: 10 }}
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
      <View style={{ borderTopWidth: 1, borderColor: 'lightgray' }}>
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


  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10, backgroundColor: 'white', flex: 1 }}>
      <StatusBar barStyle={'default'} backgroundColor={'rgb(80,80,255)'} />
      <View style={{ height: profileOpen ? '100%' : 60, position: 'absolute', alignSelf: 'center', zIndex: 10, elevation: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.9)" }}>
        <View style={{ flex: profileOpen ? 1 : 0, padding: 5, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }} >
            <Ionicons name={profileOpen ? 'arrow-back-sharp' : 'md-code-download'} size={32} color={'black'} onPress={() => setprofileOpen(!profileOpen)} />
            <Text style={{ color: 'rgb(255,0,25)', fontSize: 18, fontWeight: 'bold' }}>Welcome {userData.ServiceProvideName}</Text>
            <Pressable onPress={() => setprofileOpen(!profileOpen)}>
              <View>
                <Image source={{ uri: userData.ServiceProviderImage || defaultImage, width: 50, height: 50 }} style={{ borderRadius: 25 }} />
              </View>
            </Pressable>
          </View>
          {
            profileOpen &&
            <View style={{ justifyContent: 'center', alignItems: 'center', }} >
              <Text>{userData.ServiceProvideName} </Text>
              <Text>{userData.ServiceProviderPhone}</Text>
              <Text>{userData.ServiceProviderEmail} </Text>
              <Pressable style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-evenly', width: 150, alignItems: 'center', elevation: 8, borderWidth: 2, borderColor: 'white' }} onPress={userLogoutConstant}>
                <Text style={{ color: 'white', fontSize: 18 }}>Logout</Text>
                <Ionicons name='log-out' size={30} color={'white'} />
              </Pressable>
            </View>
          }
        </View>
      </View>
      <View style={{marginTop:60}}>
        <AddServiceForm/>
        <ServicesList/>
      </View>
      <ScrollView style={{ height: '100%'}} 
      refreshControl={
        <RefreshControl refreshing={!loadedAssignedServices} onRefresh={onRefresh} title="Loading" />
      }
      >
        
        {
          IsSerivceRequestSucces &&
          <View style={{ backgroundColor: 'white', borderRadius: 10, elevation: 8, margin: 8 }}>
            <ImageBackground source={{ uri: selectedService.service_img }} style={{ height: 200 }} resizeMode={'cover'}>
            </ImageBackground>
            <View style={{ padding: 10 }}>
              <Text>Request for {selectedService?.service_title} Service sent  </Text>
              <Text>Kindly wait to get it approved. Thankyou for intrest</Text>
            </View>
            <Button title='Ok' />
          </View>
        }
        {
          dataofServicesbyapi.map((item, index) => (
            <View key={index} style={{ borderColor: 'lightgray', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, elevation: 6, borderRadius: 15, padding: 5, margin: 6, backgroundColor: 'white' }}>
              <View style={{flexDirection:'row'}}>
                <Image source={{ uri: item.service_img }} style={{ height: 40, width: 40 }} />
                <View >
                  <Text >{item.service_title}</Text>
                  <Text>{item.ServicePincode}</Text>
                  <Text style={{ backgroundColor: 'green', padding: 3, fontSize: 9, alignSelf: 'flex-start', borderRadius: 5, color: 'white' }}>{item.ServiceStatus}</Text>
                </View>
              </View>
              <Pressable style={{ alignItems: 'center' }} onPress={()=>{
               Alert.alert("Show more","We are working on this")
              }}>
                <Text style={{color:'blue'}}>Show more </Text>
                <Ionicons name={'chevron-down'} size={20} color='blue' />
              </Pressable>
              
            </View>

          ))
        }
      </ScrollView>
    </View>
  )
}

export default ServiceProviderDashBord
