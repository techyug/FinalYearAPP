import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { defaultAvatarImage } from '../Constants/Gconstants';
import { useNavigation } from '@react-navigation/native';
import { callApi } from '../Constants/Async_functions';
import { serverIP } from '../Constants/IPofBackned';
import { Ionicons } from '@expo/vector-icons';

const UserChatScreen = () => {
  const messages1 = useSelector((state)=>state.messages1)||new Map();
  const messages = Array.from(messages1)
  messages.sort(function (a, b) {
    let date1 = new Date(a[1][a[1].length - 1]?.timestamp);
    let date2 = new Date(b[1][b[1].length - 1]?.timestamp);
    return date2 - date1;
  });
  const [profileImagesWithPhoneAsKey, setProfileImagesWithPhoneAsKey] = useState({});
  const navigation = useNavigation()
  
  useEffect(() => {
    const fetchProfileImages = async () => {
      const promises = [];
      for (const key of messages1.keys()) {
        promises.push(callApi(serverIP + '/service-provider-by-phone/' + key, 'GET'));
      }
      try {
        const responses = await Promise.all(promises);

        const images = {};
        responses.forEach((res, index) => {
          console.log(res.data)
          images[res.data.ServiceProviderPhone] = res.data;
        });
        setProfileImagesWithPhoneAsKey(images);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImages();
  }, []);
console.log(profileImagesWithPhoneAsKey)
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'rgba(200,0,100,1)', padding: 10, alignItems: 'center' }} >
        <Text style={{ color: 'white', marginRight: 10 }}>All Messages - HelpMeet</Text>
      </View>
      {
        messages.length ?
          (
            <FlatList
              data={messages}
              renderItem={({ item, index }) => {
                
                const gmtTime = new Date(item[1][item[1].length - 1].timestamp);
                const istTime = new Date(gmtTime.setHours(gmtTime.getHours(), gmtTime.getMinutes()));

                const formattedTime = istTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                return (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('PersonalChatScreen', { ChatTo: item[0] })
                    }
                    
                    style={{
                      flexDirection: 'row',
                      padding: 5, paddingHorizontal: 10,
                      alignItems: 'center'
                      , borderBottomWidth: 1,
                      borderBottomColor: 'lightgray'
                    }}>
                    <Image source={{ uri: profileImagesWithPhoneAsKey[item[0]]?.ServiceProviderImage ? serverIP + profileImagesWithPhoneAsKey[item[0]].ServiceProviderImage : defaultAvatarImage, width: 50, height: 50, }} style={{ borderRadius: 25, alignSelf: 'center' }} />
                    <View style={{ flex: 1, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{}}>
                        <Text style={{ fontWeight: '700' }}>{profileImagesWithPhoneAsKey[item[0]]?.ServiceProvideName}</Text>
                        <Text style={{ color: 'gray' }} numberOfLines={1} >Message : {item[1][item[1].length - 1].msg}</Text>
                      </View>
                      <View>
                        <Text style={{ backgroundColor: 'red', color: 'white', paddingHorizontal: 7, borderRadius: 18, fontSize: 18, alignSelf: 'center' }}>{item[1].length}</Text>
                        <Text>{formattedTime}</Text>
                      </View>
                    </View>

                  </Pressable>
                )

              }}
            />
          ) :
          (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

              <Text>
                No messages
              </Text>
              <Ionicons name='chatbox-ellipses' color={'gray'} size={30}/>
            </View>
          )
      }


    </View>
  )
}

export default UserChatScreen

const styles = StyleSheet.create({})