import { View, Text, Image, ScrollView, Button, TextInput, FlatList, Pressable, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';

import { defaultAvatarImage } from '../Constants/Gconstants';
import { Ionicons } from '@expo/vector-icons';
import { connectToSocket } from '../Constants/GlobalSocket';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { newMessageToRedux, updateInfo } from '../Redux/actions';
import { callApi, getISTLocal } from '../Constants/Async_functions';
import DbOperations from '../LocalStorage/index'
import * as Location from 'expo-location';
import { serverIP } from '../Constants/IPofBackned';


const ServiceProviderShowcase = (props) => {
    const navigation = useNavigation();
    const [bookDate, setBookDate] = useState(new Date())
    const [datePicker, showDatePicker] = useState(false)
    const [booked,setBooked] = useState(false)
    const [bookingDescription, SetBookingDescription] = useState('');
    const [bookingModel, setBookingModel] = useState(false)
    const userData = useSelector(s => s.userData)
    const [chatboxHeight, setchatboxHeight] = useState(60)
    const p = { "CreatedAt": "2023-02-28T15:31:40.000Z", "ProviderStatus": "New Provider", "ServiceProvideName": "Kaushalendra ", "ServiceProviderEmail": "Ttststys@gmail.com", "ServiceProviderId": 1, "ServiceProviderIdinMap": 1, "ServiceProviderImage": null, "ServiceProviderPassword": "54321", "ServiceProviderPhone": "9696567462", "service_description": "All type of Camera operators", "service_id": 1, "service_img": "https://img.freepik.com/free-vector/videographer-concept-illustration_114360-1439.jpg", "service_title": "Camera man", "super_cat_id": 2 }
    const ProviderData = props.route.params.ProviderData

    const [chatBox, setChabox] = useState("");
    var socket = connectToSocket();
    const messages1 = useSelector(s => s.messages1);
    const messages = messages1.get(ProviderData.ServiceProviderPhone) || [];
    const flatListRef = useRef(null);
    const commonUserData = useSelector(state => state.commonUserData)
    const [userLocation, setUserLocation] = useState({ "coords": { "accuracy": 0, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 0.0000000, "longitude": 0.000000, "speed": 0 }, "mocked": false, "timestamp": 0 })
    const [readableLocation, setreadableLocation] = useState(null)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        navigation.setOptions({ title: ProviderData.ServiceProvideName })
        if (messages.length)
            flatListRef.current.scrollToEnd({ animated: true });


        return () => {

        }
    }, [])

    useEffect(() => {
        if (messages.length)
            flatListRef.current.scrollToEnd({ animated: true });

    }, [messages.length])
    const dispatch = useDispatch()
    const handleSendMessage = () => {
        if (chatBox.length) {

            socket.emit('new-message', {
                fromPhone: userData.user_phone,
                sentAt: new Date(),
                senderName: userData.user_name,
                receiverName: ProviderData.ServiceProvideName,
                toPhone: ProviderData.ServiceProviderPhone,
                msg: chatBox
            }, (d) => {
                let f = {
                    fromPhone: commonUserData.userPhone,

                    timestamp: new Date(),
                    receiverName: ProviderData.ServiceProvideName,
                    senderName: userData.user_name,
                    toPhone: ProviderData.ServiceProviderPhone,
                    msg: chatBox,
                    amIsender: true
                }

                dispatch(newMessageToRedux(f))
                DbOperations.insertMessageToTable(commonUserData.role, d.messageId, commonUserData.userName, commonUserData.userPhone, f.toPhone, f.receiverName, chatBox, true,new Date().toISOString() ,d.statusCode);

                console.log("call back", d)
            })
            setChabox('');
        } else return

    }
    const sendBookingRequest = () => {
        setLoading(true)
 
        const bookingData= {
            booked_by_user_id :userData.user_id,
            service_provider_id:ProviderData.ServiceProviderId,
            service_id: ProviderData.service_id, 
            booked_for_date:bookDate.toISOString(),
            locationForService:userLocation,
            description_by_user:bookingDescription
           
        }
        callApi(serverIP+'/bookings','POST',bookingData).then(res=>{
            console.log("res",res.data)
            dispatch(updateInfo({ msg: "Request Sent", show: true, infoType: "Success" }));
            setBooked(true)
            setBookingModel(false)
           
        }).catch(e=>{
            dispatch(updateInfo({ msg: e.toString(), show: true, infoType: "Error" }));
        })
        socket.emit('new-booking-request',sendBookingRequest,(ack)=>{
            console.log(ack)
        })
        setLoading(false)
       

    }
    const GetLocation = async()=>{
        setLoading(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Location","Please allow location to use this feature")
          return;
        }
        Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High}).then(value=>{
        setUserLocation(value)
        console.log(value)
        Location.reverseGeocodeAsync(value.coords).then(value=>{
            setreadableLocation(value[0])
            setLoading(false)
         }).catch(res=>{
             console.log(res)
             setLoading(false)
         })
        }).catch(reason=>{
            console.log(reason)
            setLoading(false)
        });
       
        
    }
    const onchangeDate = (event, selectedDate) => {
        console.log(selectedDate)
        showDatePicker(false)
        setBookDate(selectedDate)

    };
    const openchatBox = () => {
        if (chatboxHeight == 300) {
            setchatboxHeight(60);
        } else setchatboxHeight(300)
        if (messages.length)
            flatListRef.current.scrollToEnd({ animated: true });


    }
    const ProviderNameBox = () =>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5, paddingVertical: 10, alignItems: 'center', backgroundColor: 'white', borderRadius: 20, elevation: 2, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Image style={{ borderRadius: 30, borderColor: 'red', borderWidth: 2 }} source={{ uri: ProviderData.ServiceProviderImage?serverIP+ProviderData.ServiceProviderImage :defaultAvatarImage, height: 60, width: 60 }} />
                <View style={{ justifyContent: "space-evenly", marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{ProviderData.ServiceProvideName}</Text>
                    <Text style={{ backgroundColor: 'blue', color: 'white', borderRadius: 10, textAlign: 'center', padding: 3, fontSize: 12 }}>{ProviderData.service_title}</Text>
                </View>
            </View>
            <View>
                <Text style={{backgroundColor:'lightgray',paddingHorizontal:5,borderRadius:10}}>Fee/Charges</Text>
                <Text style={{color:'blue'}}>{ProviderData.serviceProviderFee}</Text>
            </View>
        </View>

    return (
        <View style={{ flex: 1, paddingHorizontal: 0, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ padding: 15, paddingTop: 0 }} >

                <Image source={{ uri: ProviderData.service_img, height: 200 }} />
                <ProviderNameBox />

                <Text style={{ fontSize: 18 }} >Reviews</Text>
                <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: 'white', alignSelf: 'flex-start', padding: 5, position: 'relative', zIndex: -1, elevation: 5 }}>
                        <Text>Aman :</Text>
                        <Text style={{ fontWeight: '900' }}>Very Nice</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text> 5</Text>
                            <Ionicons name='star' size={15} color='green' />
                        </View>

                    </View>
                    <View style={{ elevation: 5, backgroundColor: 'white', padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                        <Text>Lorem ipsum dolor sit amet. Qui consequatur laudantium et laudantium accusantium est animi doloremque est quod eius aut fugit autem. </Text>
                        <ScrollView horizontal scrollEnabled={true} contentContainerStyle={{ padding: 10 }}>
                        </ScrollView>
                    </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', borderTopRightRadius: 10, borderTopLeftRadius: 10, alignItems: 'center', backgroundColor: 'white', alignSelf: 'flex-start', padding: 5, position: 'relative', zIndex: -1, elevation: 5 }}>
                        <Text>Aman :</Text>
                        <Text style={{ fontWeight: '900' }}>Very Nice</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text> 5</Text>
                            <Ionicons name='star' size={15} color='green' />
                        </View>

                    </View>
                    <View style={{ elevation: 5, backgroundColor: 'white', padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                        <Text>Lorem ipsum dolor sit amet. Qui consequatur laudantium et laudantium accusantium est animi doloremque est quod eius aut fugit autem. </Text>
                        <ScrollView horizontal scrollEnabled={true} contentContainerStyle={{ paddingLeft: 10 }}>
                        </ScrollView>
                    </View>
                </View>
                <Modal visible={bookingModel} transparent   animationType="fade" >
                    <View style={{flex:1,backgroundColor:'rgba(0,100,200,0.4)'}}>
                    <View style={{
                        backgroundColor: 'white', padding: 10, borderRadius: 10, 
                        alignSelf: 'center',top:'40%',width:'90%',
                        
                        elevation: 5,
                    }}>
                        <Pressable onPress={() => showDatePicker(true)}>
                            <Text>
                                For : {ProviderData.service_title}
                            </Text>
                            <Text>
                                Choose Booking Date : {bookDate.toLocaleDateString()}
                            </Text>
                            {datePicker && bookingModel && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={bookDate}
                                    mode={'date'}
                                    is24Hour={false}
                                    onChange={onchangeDate}
                                />
                            )}
                        </Pressable>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>
                                Write Discription :
                            </Text>
                            <TextInput multiline numberOfLines={4}  style={{ padding: 5, textAlign: 'left', maxWidth: '80%' }} onFocus={() => setchatboxHeight(60)} placeholder='Your booking description' value={bookingDescription} onChangeText={(text) => SetBookingDescription(text)} />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                            <Text>Choose Location :{readableLocation?.city+', '+readableLocation?.region}  </Text>
                            {loading &&  <ActivityIndicator/> }
                            <Ionicons name={'location-outline'} size={30} style={{borderRadius:10,backgroundColor:'lightgray'}}  color={readableLocation?'black':'blue'} onPress={GetLocation}/>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button title='Cancel' color={'red'} onPress={() => setBookingModel(false)} />
                            <Button title='Send' color={'blue'} onPress={sendBookingRequest} />
                        </View>
                    </View>
                    </View>
                </Modal>
            </ScrollView>
            <View style={{ height: chatboxHeight, borderTopWidth: 2, justifyContent: 'space-between', elevation: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', padding: 10, }}>
                    <Button title={chatboxHeight!=60?'Hide':'chat'} onPress={openchatBox} color={'orange'} />
                    {booked?
                    <Button title='Go to My Bookings' onPress={()=>navigation.navigate('Profile')} />
                    :
                    <Button title='Send Booking request' color={'green'} onPress={() => setBookingModel(true)} />} 
                </View>
                {
                    <FlatList data={messages} ref={flatListRef} style={{ paddingHorizontal: 20, display: chatboxHeight != 60 ? 'flex' : 'flex' }} renderItem={({ item, index }) => (
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, alignSelf: !item.amIsender ? 'flex-start' : 'flex-end', margin: 2 }} >
                            <Text>
                                {item.msg}
                            </Text>

                        </View>
                    )} />
                }

                {
                    chatboxHeight != 60 &&
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextInput placeholder='Write message' value={chatBox} onSubmitEditing={handleSendMessage} onChangeText={t => setChabox(t)} style={{ paddingRight: 20, fontSize: 18, borderWidth: 1, flex: 1, marginHorizontal: 10, backgroundColor: 'lightgray', borderRadius: 10, padding: 10, margin: 5 }} />
                        <Ionicons onPress={handleSendMessage} disabled={!chatBox.length} name='send' style={{ backgroundColor: 'lightgray', borderRadius: 25, padding: 10 }} size={30} color={chatBox.length ? 'blue' : 'white'} />
                    </View>
                }
            </View>
        </View>
    )
}

export default ServiceProviderShowcase