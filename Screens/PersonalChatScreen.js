import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { connectToSocket } from '../Constants/GlobalSocket';
import { useDispatch, useSelector } from 'react-redux';
import { newMessageToRedux } from '../Redux/actions';
import { callApi, getISTLocal } from '../Constants/Async_functions';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import DbOperations from '../LocalStorage/index'
import { defaultAvatarImage, userRoleType } from '../Constants/Gconstants';
import TextWithLinks from '../Constants/TextWithLinks';
import { serverIP } from '../Constants/IPofBackned';


const PersonalChatScreen = (props) => {

    const [chatBox, setChabox] = useState("");
    const [remotePersonDetails, setRemotePersonDetails] = useState(null)
    const socket = connectToSocket()
    const chatToPhone = props.route.params.ChatTo
    const userData = useSelector(s => s.userData)
    const dispatch = useDispatch()
    const flatListRef = useRef(null);
    const Allmessages = useSelector(s => s.messages1)
    const messages = Allmessages.get(chatToPhone) || []
    const navigation = useNavigation()
    const commonUserData = useSelector(s => s.commonUserData)
    let myName = "";
    let MyPhone = '';

    if (userData.role == 'user') {
        myName = userData.user_name
        MyPhone = userData.user_phone

    } else if (userData.role == 'Service Provider') {
        myName = userData.ServiceProvideName
        MyPhone = userData.ServiceProviderPhone
    }

    useEffect(() => {
        if(messages.length)
        flatListRef.current.scrollToEnd({ animated: true })
    }, [messages.length])
    useEffect(() => {
        
        if (commonUserData.role != 'user') {
            callApi(serverIP + '/user/' + chatToPhone, 'GET').then(res => {
                setRemotePersonDetails(res.data)
                navigation.setOptions({
                    title: res.data.user_name,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='arrow-back' size={30} color='blue' onPress={() => navigation.goBack()} />
                            <Image source={{ uri: res.data.user_image ? serverIP + res.data.user_image : defaultAvatarImage }} style={{ height: 40, width: 40, borderRadius: 20, marginHorizontal: 10 }} />
                        </View>
                })
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            callApi(serverIP + '/service-provider-by-phone/' + chatToPhone, 'GET').then(res => {
                setRemotePersonDetails(res.data)
                console.log(res.data)
                navigation.setOptions({
                    title: res.data.ServiceProvideName,
                    headerLeft: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='arrow-back' size={30} color='blue' onPress={() => navigation.goBack()} />
                            <Image source={{ uri: res.data.ServiceProviderImage ? serverIP + res.data.ServiceProviderImage : defaultAvatarImage }} style={{ height: 40, width: 40, borderRadius: 20, marginHorizontal: 10 }} />
                        </View>
                })
            }).catch(err => {
                console.log(err)
            })
        }

        if (messages.length)
        flatListRef.current.scrollToEnd({ animated: true });



    }, [])

   
    const handleSendMessage = () => {
        if (chatBox.length) {
            socket.emit('new-message', {
                fromPhone: MyPhone,
                sentAt: new Date(),
                senderName: myName,
                toPhone: chatToPhone,
                msg: chatBox
            }, (d) => {
                let f = {
                    fromPhone: commonUserData.userPhone,
                    timestamp: new Date(),
                    senderName: myName,
                    toPhone: chatToPhone,
                    msg: chatBox,
                    amIsender: true,
                    messageId: d.messageId,
                    statusCode: d.statusCode
                }

                dispatch(newMessageToRedux(f))
                DbOperations.insertMessageToTable(commonUserData.role, d.messageId, myName, MyPhone, chatToPhone, f.receiverName, chatBox, true, f.timestamp.toISOString(), d.statusCode);
                console.log("call back", d)

            })

            setChabox('');
        } else return
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                data={messages}
                ref={flatListRef}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: item.toPhone.length < 10 ? 'lightblue' : 'pink', padding: 10, maxWidth: '75%', borderRadius: 5, alignSelf: !item.amIsender ? 'flex-start' : 'flex-end', margin: 2 }} >

                        <TextWithLinks text={item.msg} />

                    </View>
                )}
            />
            <View style={{ backgroundColor: 'white' }}>

                <Input placeholder='Write message' value={chatBox} onFocu={() => flatListRef.current.scrollToEnd({ animated: true })} onSubmitEditing={handleSendMessage} onChangeText={t => setChabox(t)} style={{ paddingRight: 20, borderWidth: 0 }} containerStyle={{ paddingHorizontal: 20, borderBottomWidth: 0 }} rightIcon={() => (<Ionicons onPress={handleSendMessage} name='send' style={{}} size={25} color={'green'} />)} />
            </View>
        </View>
    )
}

export default PersonalChatScreen