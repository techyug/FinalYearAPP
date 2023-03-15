import { FlatList, StyleSheet, Text, View, Image, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { serverIP } from '../Constants/IPofBackned'
import { useDispatch, useSelector } from 'react-redux';
import { updateMessages } from '../Redux/actions'
import { callApi } from '../Constants/Async_functions'

const UserChatScreen = () => {
  const [loaded, setloaded] = useState(false)
  const [messageMap2, setmessageMap2] = useState(null)
  const [temp, setTemp] = useState([]);
  const userData = useSelector((state => state.userData))
  const messages = useSelector((state => state.messages))
  const dispatch = useDispatch()
  // console.log("message count ", messages.length)

  let messageMap = new Map();
  useEffect(() => {

    messages.map((item, index) => {
      // if (item.fromPhone !== userData.ServiceProviderPhone && !messageMap.has(item.fromPhone)) {
      //   messageMap.set(item.fromPhone, [item])
      // } else if (item.fromPhone !== userData.ServiceProviderPhone) {
      //   messageMap.get(item.fromPhone).push(item)
      // }

      if(item.toPhone!==userData.user_phone && !messageMap.has(item.toPhone)){
        messageMap.set(item.toPhone,[item])
      }else if(item.toPhone !==userData.user_phone){
        messageMap.get(item.toPhone).push(item)
      }

    })
    setmessageMap2(messageMap)
    setTemp(Array.from(messageMap).map(([key, value]) => ({ key, value })));

  }, [messages.length])

  // console.log("new message map2", messageMap2)
  // console.log("temp array, ", temp)
  //   setTemp(Array.from(messageMap).map(([key, value]) => ({ key, value })));
  //  console.log(temp)


  const ChatsPerson = () => (
    <>
      <ScrollView style={{}}>
        {
          temp.map(item => (
            <View key={item.key} style={{ backgroundColor: 'lightgray', padding: 6, borderBottomWidth: 1, borderRadius: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.value[0].senderImage || "https://t4.ftcdn.net/jpg/01/17/95/91/360_F_117959178_mOp22kjhdhWdoSoePHPafN7GLUYyvFNY.jpg" }} style={{ height: 50, width: 50, borderWidth: 2, marginEnd: 10, borderColor: 'green', borderRadius: 25 }} />
                <View>
                  <Text key={item.key} >{item.value[0].receiverName}</Text>
                  <Text>{item.value[item.value.length - 1].msg}</Text>
                </View>

              </View>
              <View style={{ backgroundColor: 'green', padding: 6, borderRadius: 20 }}>
                <Text style={{ color: 'white' }} >{item.value.length}</Text>
              </View>
            </View>

          ))

        }
      </ScrollView>
    </>
  )



  let msgs = [{ "fromPhone": "7080784497", "msg": "Fgh", "receivedAt": "2023-03-15T05:31:03.713Z", "senderName": "Yogendsingh", "sentAt": "2023-03-15T05:31:02.683Z", "toPhone": "8429582215" }]
  // useEffect(()=>{
  //   callApi( serverIP+'/messages-of-provider/'+userData.ServiceProviderId).then((r)=>{
  //     dispatch(updateMessages(r.data))
  //     setloaded(true)
  //   }).catch(e=>{
  //     setloaded(true)
  //     console.log(e)
  //   })
  // },[loaded])
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'green', padding: 10, alignItems: 'center' }} >
        <Text style={{ color: 'white', marginRight: 10 }}>All Messages</Text>
      </View>
      <View style={{ padding: 10, flex: 1 }} >
        <ChatsPerson />
        {/* <FlatList data={messageMap}
        refreshControl = {
          <RefreshControl refreshing={loaded}/>
        }
         renderItem={({ item, index }) => (
          <View style={{ backgroundColor: 'lightgray', padding: 10, borderBottomWidth: 1, borderRadius: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: item.user_image||"https://t4.ftcdn.net/jpg/01/17/95/91/360_F_117959178_mOp22kjhdhWdoSoePHPafN7GLUYyvFNY.jpg" }} style={{ height: 50, width: 50, borderWidth: 2, marginEnd: 10, borderColor: 'green', borderRadius: 25 }} />
            <View>
            
            <Text>{item.length+index}</Text>
            </View>
            

          </View>
        )} /> */}
      </View>

    </View>
  )
}

export default UserChatScreen

const styles = StyleSheet.create({})