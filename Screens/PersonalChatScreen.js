import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { connectToSocket } from '../Constants/GlobalSocket';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessages } from '../Redux/actions';
import { getISTLocal } from '../Constants/Async_functions';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const PersonalChatScreen = (props) => {
    
    const [chatBox, setChabox] = useState("");
    const socket = connectToSocket()
    const chatToData = props.route.params.ChatTo
    console.log(chatToData)
    const userData = useSelector(s=>s.userData)
    const dispatch = useDispatch()


    let myName = "";
    let MyPhone = '';
    if( userData.role=='user'){
        myName = userData.user_name
        MyPhone = userData.user_phone
    }else if( userData.role=='Service Provider'){
        myName = userData.ServiceProvideName
        MyPhone = userData.ServiceProviderPhone
    }
    const Allmessages = useSelector(s=>s.messages)
    const messages =Allmessages.filter(i=>i.toPhone==chatToData.key || i.fromPhone==chatToData.key)
    console.log("all messages :",Allmessages)
    console.log("filered : ",messages)
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: chatToData.value[0].senderName
        })
    }, [])
    const handleSendMessage = () => {
        if (chatBox.length) {

            socket.emit('new-message', {
                fromPhone: MyPhone,
                sentAt: getISTLocal().toString(),
                senderName: myName,
                toPhone: chatToData.key,
                msg: chatBox
            }, (d) => {

                dispatch(updateMessages([...Allmessages, {
                    fromPhone: MyPhone,
                    sentAt: getISTLocal().toString(),
                    receivedAt : "0",
                    receiverName:chatToData.value[0].senderName,
                    senderName: myName,
                    toPhone: chatToData.key,
                    msg: chatBox
                }]))
                
                console.log("call back", d)
            })
            setChabox('');
        } else return
    }
    return (
        <View style={{flex:1}}>
            <FlatList
                data={messages}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, alignSelf: item.fromPhone==MyPhone?'flex-end':'flex-start', margin: 2 }} >
                        <Text>
                            {item.msg}
                        </Text>

                    </View>
                )}
            />
            <View style={{ backgroundColor: 'white' }}>

                <Input placeholder='Write message' value={chatBox} onSubmitEditing={handleSendMessage} onChangeText={t => setChabox(t)} style={{ paddingRight: 20, borderWidth: 0 }} containerStyle={{ paddingHorizontal: 20, borderBottomWidth: 0 }} rightIcon={() => (<Ionicons onPress={handleSendMessage} name='send' style={{}} size={25} color={'green'} />)} />
            </View>
        </View>
    )
}

export default PersonalChatScreen