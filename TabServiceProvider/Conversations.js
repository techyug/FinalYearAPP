import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, {  } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { defaultAvatarImage } from '../Constants/Gconstants';

const Conversations = () => {
  const messages1 = useSelector(state => state.messages1);
  const temp = Array.from(messages1);
  const navigation = useNavigation()
  
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'green', padding: 10, alignItems: 'center' }} >
        <Text style={{ color: 'white', marginRight: 10 }}>All Messages</Text>
      </View>

      <FlatList
        data={temp}
        renderItem={({ item, index }) => (
          <Pressable onPress={()=>navigation.navigate('PersonalChatScreen',{ChatTo:item[0]})}  style={{ flexDirection: 'row' ,padding:5,paddingHorizontal:10,alignItems:'center',backgroundColor:'lightgray'}}>
            <Image source={{ uri: defaultAvatarImage, width: 50, height: 50, }} style={{borderRadius:25,alignSelf:'center'}} />
            <View style={{ flex: 1 ,paddingHorizontal:10}}>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <Text >{item[1][item[1].length - 1].senderName}</Text>
                <Text style={{backgroundColor:'red',color:'white'}}>{item[1].length}</Text>
              </View>
              <Text style={{ }} numberOfLines={1} >{item[1][item[1].length - 1].msg}</Text>
            </View>

          </Pressable>

        )}
      />
    </View>
  )
}

export default Conversations
