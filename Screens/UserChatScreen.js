import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, {  } from 'react'
import { useSelector } from 'react-redux';
import { defaultAvatarImage } from '../Constants/Gconstants';
import { useNavigation } from '@react-navigation/native';

const UserChatScreen = () => {
  const messages1 = useSelector((state)=>state.messages1)||new Map();
  const messages = Array.from(messages1)
  
  const navigation = useNavigation()

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'green', padding: 10, alignItems: 'center' }} >
        <Text style={{ color: 'white', marginRight: 10 }}>All Messages</Text>
      </View>
      <View style={{ padding: 10, flex: 1 }} >
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <Pressable key={item[0]} onPress={()=>navigation.navigate('PersonalChatScreen',{ChatTo:item[0]})}  style={{ flexDirection: 'row' ,padding:5,paddingHorizontal:10,alignItems:'center',backgroundColor:'lightgray'}}>
            <Image source={{ uri: defaultAvatarImage, width: 50, height: 50, }} style={{borderRadius:25,alignSelf:'center'}} />
            <View style={{ flex: 1 ,paddingHorizontal:10}}>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <Text >{(item[1][item[1].length - 1].toPhone).length<10?"dsckndc":item[1][item[1].length - 1].toPhone}</Text>
                <Text style={{backgroundColor:'red',color:'white'}}>{item[1].length}</Text>
              </View>
              <Text >{item[1][item[1].length - 1].msg}</Text>
            </View>

          </Pressable>

        )}
      /> 
      </View>

    </View>
  )
}

export default UserChatScreen

const styles = StyleSheet.create({})