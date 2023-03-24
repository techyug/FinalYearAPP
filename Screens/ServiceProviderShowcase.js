import { View, Text, Image, ScrollView, Button, TextInput, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { defaultAvatarImage } from '../Constants/Gconstants';
import { Ionicons } from '@expo/vector-icons';
import { Axios } from 'axios';
import { Input } from 'react-native-elements';
import { connectToSocket } from '../Constants/GlobalSocket';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { newMessageToRedux, updateMessages } from '../Redux/actions';
import { getISTLocal } from '../Constants/Async_functions';


const ServiceProviderShowcase = (props) => {
    const navigation = useNavigation();

    const userData = useSelector(s => s.userData)
    const [chatboxHeight, setchatboxHeight] = useState(60)
    const p = { "CreatedAt": "2023-02-28T15:31:40.000Z", "ProviderStatus": "New Provider", "ServiceProvideName": "Kaushalendra ", "ServiceProviderEmail": "Ttststys@gmail.com", "ServiceProviderId": 1, "ServiceProviderIdinMap": 1, "ServiceProviderImage": null, "ServiceProviderPassword": "54321", "ServiceProviderPhone": "9696567462", "service_description": "All type of Camera operators", "service_id": 1, "service_img": "https://img.freepik.com/free-vector/videographer-concept-illustration_114360-1439.jpg", "service_title": "Camera man", "super_cat_id": 2 }
    const ProviderData = props.route.params.ProviderData
    //const allmessages = useSelector(s => s.messages)
    // const messages =allmessages.filter(i=>i.toPhone==ProviderData.ServiceProviderPhone ||  i.fromPhone==ProviderData.ServiceProviderPhone)
    // console.log("alll:",allmessages)
    // console.log("ppppp:",messages)
    const [chatBox, setChabox] = useState("");
    var socket = connectToSocket();
    const messages1 = useSelector(s=>s.messages1);
    const messages = messages1.get(ProviderData.ServiceProviderPhone)||[];
    //console.log("message 1",messages1.get(ProviderData.ServiceProviderPhone))
    const flatListRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({ title: ProviderData.ServiceProvideName })
        if(messages.length)
        flatListRef.current.scrollToEnd({ animated: true });


        return () => {

        }
    }, [])
    
   useEffect(()=>{
    if(messages.length)
   flatListRef.current.scrollToEnd({ animated: true });

   },[messages.length])
    const dispatch = useDispatch()
  let msg  = {"fromPhone": "7080784497", "msg": "Ffff", "senderName": "Yogendsingh", "sentAt": "2023-03-13T15:53:19.100Z", "toPhone": "8429582215"}
    const handleSendMessage = () => {
        if (chatBox.length) {

            socket.emit('new-message', {
                fromPhone: userData.user_phone,
                sentAt: new Date(),
                senderName: userData.user_name,
                toPhone: ProviderData.ServiceProviderPhone,
                msg: chatBox
            }, (d) => {
                let f = {
                    fromPhone: "0",
                    sentAt: getISTLocal().toString(),
                    receivedAt : "0",
                    receiverName:ProviderData.ServiceProvideName,
                    senderName: userData.user_name,
                    toPhone: ProviderData.ServiceProviderPhone,
                    msg: chatBox
                }
                dispatch(newMessageToRedux(f))
                console.log("call back", d)
            })
            setChabox('');
        } else return

    }
    const openchatBox = () => {
        if (chatboxHeight == 300) {
            setchatboxHeight(60);
        } else setchatboxHeight(300)
        if(messages.length)
        flatListRef.current.scrollToEnd({ animated: true });


    }
    const ProviderNameBox = () =>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5, paddingVertical: 10, alignItems: 'center', backgroundColor: 'white', borderRadius: 20, elevation: 2, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Image style={{ borderRadius: 30, borderColor: 'red', borderWidth: 2 }} source={{ uri: ProviderData.ServiceProviderImage || defaultAvatarImage, height: 60, width: 60 }} />
                <View style={{ justifyContent: "space-evenly", marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{ProviderData.ServiceProvideName}</Text>
                    <Text style={{ backgroundColor: 'blue', color: 'white', borderRadius: 10, textAlign: 'center', padding: 3, fontSize: 12 }}>{ProviderData.service_title}</Text>
                </View>
            </View>
            <View>
                <Text>{ProviderData.ProviderStatus}</Text>
            </View>
        </View>

    return (
        <View style={{ flex: 1, paddingHorizontal: 0, backgroundColor: 'rgb(230,230,230)' }}>
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
                        <Text>this is  a big review to this provide i am ipressd this is  a big review to this provide i am ipressd </Text>
                        <ScrollView horizontal scrollEnabled={true} contentContainerStyle={{ padding: 10 }}>
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
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
                        <Text>this is  a big review to this provide i am ipressd this is  a big review to this provide i am ipressd </Text>
                        <ScrollView horizontal scrollEnabled={true} contentContainerStyle={{ paddingLeft: 10 }}>
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: chatboxHeight, borderTopWidth: 2, justifyContent: 'space-between', elevation: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', padding: 10, }}>
                    <Button title='Chat' onPress={openchatBox} color={'orange'} />
                    <Button title='Send Booking request' color={'green'} />
                </View>
                {
                     
                    <FlatList data={messages} ref={flatListRef} style={{paddingHorizontal:20,display:chatboxHeight != 60?'flex':'flex'}}  renderItem={({item,index})=>(
                        <View style={{backgroundColor:'white',padding:10,borderRadius:5,alignSelf:item.toPhone.length<10 ?'flex-start':'flex-end',margin:2}} >
                            <Text>
                                {item.msg}
                            </Text>
                            
                        </View>
                    )}/>
                }

                {
                    chatboxHeight != 60 &&
                    <View style={{ backgroundColor: 'white',paddingHorizontal:10 ,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <TextInput  placeholder='Write message' value={chatBox} onSubmitEditing={handleSendMessage} onChangeText={t => setChabox(t)} style={{ paddingRight: 20,fontSize:18, borderWidth: 1,flex:1,marginHorizontal:10,backgroundColor:'lightgray',borderRadius:10,padding:10,margin:5}}  />
                        <Ionicons onPress={handleSendMessage} disabled={!chatBox.length} name='send' style={{backgroundColor:'lightgray',borderRadius:25,padding:10}} size={30} color={chatBox.length?'blue':'white'} />
                    </View>
                }
            </View>
        </View>
    )
}

export default ServiceProviderShowcase