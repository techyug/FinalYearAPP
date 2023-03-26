import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { connectToSocket } from '../Constants/GlobalSocket';
import { useDispatch, useSelector } from 'react-redux';
import { newMessageToRedux } from '../Redux/actions';
import { getISTLocal } from '../Constants/Async_functions';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import  DbOperations from '../LocalStorage/index'
import { userRoleType } from '../Constants/Gconstants';


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
    const commonUserData = useSelector(s=>s.commonUserData)
    

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
            title: messages[0]?messages[0].senderName:"Chat",
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
                sentAt: getISTLocal().toString(),
                senderName: myName,
            
                receiverName:"some name",
                toPhone: chatToData,
                msg: chatBox
            }, (d) => {
                let f = {
                    fromPhone: commonUserData.userPhone,
                    timestamp:getISTLocal().toString(),
                    receiverName:"dvds",
                    senderName: myName,
                    toPhone: chatToData,
                    msg: chatBox,
                    amIsender:true,
                    messageId:d.messageId,
                    statusCode:d.statusCode
                }
                
                dispatch(newMessageToRedux(f))
                DbOperations.insertMessageToTable(commonUserData.role,d.messageId,myName,MyPhone,chatToData,f.receiverName,chatBox,true,d.statusCode);
                console.log("call back", d)
                if(messages.length)
                flatListRef.current.scrollToEnd({ animated: true });
            })
           
            setChabox('');
        } else return
    }
    return (
        <View style={{flex:1, backgroundColor:"gray"}}>
            <FlatList
                data={messages}
                ref={flatListRef}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: item.toPhone.length<10?'lightblue':'pink', padding: 10,maxWidth:'75%', borderRadius: 5, alignSelf:!item.amIsender ?'flex-start':'flex-end', margin: 2 }} >
                        <Text >
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