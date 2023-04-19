import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { defaultAvatarImage } from '../Constants/Gconstants';
import { callApi } from '../Constants/Async_functions';
import { serverIP } from '../Constants/IPofBackned';

const Conversations = () => {
  const messages1 = useSelector(state => state.messages1);
  const commonData = useSelector(state => state.commonUserData)

  const temp = Array.from(messages1);
  temp.sort(function (a, b) {
    let date1 = new Date(a[1][a[1].length - 1]?.timestamp);
    let date2 = new Date(b[1][b[1].length - 1]?.timestamp);
    return date2 - date1;
  });
  const navigation = useNavigation()
  const [profileImagesWithPhoneAsKey, setProfileImagesWithPhoneAsKey] = useState({});

  useEffect(() => {
    const fetchProfileImages = async () => {
      const promises = [];
      for (const key of messages1.keys()) {
        promises.push(callApi(serverIP + '/user/' + key, 'GET'));
      }
      try {
        const responses = await Promise.all(promises);

        const images = {};
        responses.forEach((res, index) => {
          console.log(res.data)
          images[res.data.user_phone] = res.data;
        });
        setProfileImagesWithPhoneAsKey(images);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImages();
  }, []);
  
  

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'green', padding: 10,  backgroundColor:'rgb(80,80,255)',alignItems: 'center' }} >
        <Text style={{ color: 'white', marginRight: 10 ,}}>All Messages</Text>
      </View>
      {
        messages1 ?
          (
            <FlatList
              data={temp}
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
                    <Image source={{ uri: profileImagesWithPhoneAsKey[item[0]]?.user_image ? serverIP + profileImagesWithPhoneAsKey[item[0]].user_image : defaultAvatarImage, width: 50, height: 50, }} style={{ borderRadius: 25, alignSelf: 'center' }} />
                    <View style={{ flex: 1, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{}}>
                        <Text style={{ fontWeight: '700' }}>{profileImagesWithPhoneAsKey[item[0]]?.user_name}</Text>
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
            <View>

              <Text>
                No messages
              </Text>
            </View>
          )
      }

    </View>
  )
}

export default Conversations
