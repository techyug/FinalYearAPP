import { FlatList, StyleSheet, Text, View, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { defaultAvatarImage } from '../Constants/Gconstants'
import { Icon } from 'react-native-elements'
import Axios from 'axios'
import { serverIP } from '../Constants/IPofBackned'
import { useDispatch, useSelector } from 'react-redux';
import { updateMessages } from '../Redux/actions'

const Conversations = () => {
  const [loaded,setloaded] =  useState(false)
  const userData = useSelector((state=>state.userData))
 const messages = useSelector(s=>s.messages)
  const dispatch = useDispatch()

  useEffect(()=>{
    Axios.get( serverIP+'/messages-of-provider/'+userData.ServiceProviderId).then((r)=>{
      dispatch(updateMessages(r.data))
      setloaded(true)
    }).catch(e=>{
      setloaded(true)
      console.log(e)
    })
  },[loaded])
  return (
    <View style={{backgroundColor:'white',flex:1}}>
      <View style={{ backgroundColor: 'green', padding: 10, alignItems: 'center' }} >
        <Text style={{ color: 'white', marginRight: 10 }}>All Messages</Text>
      </View>
      <View style={{ padding: 10 ,flex:1}} >
        <FlatList data={messages}
        refreshControl = {
          <RefreshControl refreshing={!loaded}/>
        }
         renderItem={({ item, index }) => (
          <View style={{ backgroundColor: 'lightgray', padding: 10, borderBottomWidth: 1, borderRadius: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: item.user_image||"https://t4.ftcdn.net/jpg/01/17/95/91/360_F_117959178_mOp22kjhdhWdoSoePHPafN7GLUYyvFNY.jpg" }} style={{ height: 50, width: 50, borderWidth: 2, marginEnd: 10, borderColor: 'green', borderRadius: 25 }} />
            <View>
            <Text style={{ fontSize: 18 }}>{item.user_name}</Text>
            <Text style={{height:20,overflow:'hidden',}}>
              {item.MessageContent}
            </Text>
            </View>

          </View>
        )} />
      </View>

    </View>
  )
}

export default Conversations

const styles = StyleSheet.create({})