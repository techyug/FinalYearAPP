import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { connectToSocket } from '../Constants/GlobalSocket';
import { useDispatch, useSelector } from 'react-redux';
import { newMessageToRedux } from '../Redux/actions';
import { getISTLocal } from '../Constants/Async_functions';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const PersonalChatScreen = (props) => {
    
    const [chatBox, setChabox] = useState("");
    const socket = connectToSocket()
    const chatToData = props.route.params.ChatTo
    const userData = useSelector(s=>s.userData)
    const dispatch = useDispatch()
    const flatListRef = useRef(null);
    const Allmessages = useSelector(s=>s.messages1)
    const messages =Allmessages.get(chatToData)||[]
    const navigation = useNavigation()

    let myName = "";
    let MyPhone = '';
    if( userData.role=='user'){
        myName = userData.user_name
        MyPhone = userData.user_phone
    }else if( userData.role=='Service Provider'){
        myName = userData.ServiceProvideName
        MyPhone = userData.ServiceProviderPhone
    }
   
    useEffect(() => {
        navigation.setOptions({
            title: messages[0]?messages[0].senderName:"Chat "
        })
    }, [])
    useEffect(()=>{
        if(messages && messages.length)
       flatListRef.current.scrollToEnd({ animated: true });
    
       },[messages.length])

    const handleSendMessage = () => {
        if (chatBox.length) {
            socket.emit('new-message', {
                fromPhone: MyPhone,
                sentAt: new Date(),
                senderName: myName,
                toPhone: chatToData,
                msg: chatBox
            }, (d) => {
                let f = {
                    fromPhone: "0",
                    sentAt: getISTLocal().toString(),
                    receivedAt : "0",
                    receiverName:"dvds",
                    senderName: myName,
                    toPhone: chatToData,
                    msg: chatBox
                }
                
                dispatch(newMessageToRedux(f))
                console.log("call back", d)
                if(messages.length)
                flatListRef.current.scrollToEnd({ animated: true });
            })
           
            setChabox('');
        } else return
    }
    return (
        <View style={{flex:1}}>
            <FlatList
                data={messages}
                ref={flatListRef}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: 'white', padding: 10,maxWidth:'75%', borderRadius: 5, alignSelf:item.toPhone.length<10 ?'flex-start':'flex-end', margin: 2 }} >
                        <Text>
                            {item.msg}
                        </Text>
                    </View>
                )}
            />
            <View style={{ backgroundColor: 'white' }}>

                <Input placeholder='Write message' value={chatBox} onFocu={()=>flatListRef.current.scrollToEnd({animated:true})} onSubmitEditing={handleSendMessage} onChangeText={t => setChabox(t)} style={{ paddingRight: 20, borderWidth: 0 }} containerStyle={{ paddingHorizontal: 20, borderBottomWidth: 0 }} rightIcon={() => (<Ionicons onPress={handleSendMessage} name='send' style={{}} size={25} color={'green'} />)} />
            </View>
        </View>
    )
}

export default PersonalChatScreen