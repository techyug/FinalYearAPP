import { StatusBar, StyleSheet, Text, View, Button, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';


const ServiceProviderDashBord = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData)
  const [profileOpen, setprofileOpen] = useState(false)
  const userLogoutConstant = () => {
    dispatch(userLogout());
    AsyncStorage.removeItem('@userData');
    navigation.replace('Login')
  }
  useEffect(() => {

  }, [])
  const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10, backgroundColor: 'white', flex: 1 }}>
      <StatusBar barStyle={'default'} backgroundColor={'rgb(80,80,255)'} />
      <View style={{ height: profileOpen ? '100%' : 60,position:'absolute',alignSelf:'center',zIndex:10,elevation:8,borderRadius:20 ,backgroundColor: "rgba(255,255,255,0.9)"}}>
        <View style={{ flex: profileOpen ? 1 : 0, padding: 5, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }} >
            <Ionicons name={profileOpen ? 'arrow-back-sharp' : 'md-code-download'} size={32} color={'black'} onPress={() => setprofileOpen(!profileOpen)} />
            <Text style={{ color: 'rgb(255,0,25)', fontSize: 18, fontWeight: 'bold' }}>Welcome {userData.ServiceProvideName}</Text>
            <Pressable onPress={() => setprofileOpen(!profileOpen)}>
              <View>
                <Image source={{ uri: userData.ServiceProviderImage || defaultImage, width: 50, height: 50 }} style={{ borderRadius: 25 }} />
              </View>
            </Pressable>
          </View>
          {
            profileOpen &&
            <View style={{justifyContent:'center',alignItems:'center',}} >
              <Text>{userData.ServiceProvideName} </Text>
              <Text>{userData.ServiceProviderPhone}</Text>
              <Text>{userData.ServiceProviderEmail} </Text>
              <Pressable style={{backgroundColor:'red',padding:10,borderRadius:10,flexDirection:'row',justifyContent:'space-evenly',width:150,alignItems:'center',elevation:8,borderWidth:2,borderColor:'white'}} onPress={userLogoutConstant}>
                <Text style={{color:'white',fontSize:18}}>Logout</Text>
                <Ionicons name='log-out' size={30} color ={'white'}/>
              </Pressable>
            </View>
          }
        </View>
      </View>
      <ScrollView style={{ height: '100%',marginTop:60 }}>
        
        <View style={{ margin: 10, backgroundColor: "white", borderRadius: 10, elevation: 5 }}>
          <Text>Service</Text>
          <Image source={{ uri: 'https://t4.ftcdn.net/jpg/01/70/17/97/360_F_170179753_piUSFjn4xlwAKaIU14gs6FnCVij2wckc.jpg', height: 200 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ alignItems: 'center',margin:2, }}>
              <Ionicons name='eye' size={25} color={'lightgray'} />
              <Text style={{ color: 'gray' }}>10 Views</Text>
            </View>
            <View style={{ alignItems: 'center',margin:2, }}>
              <Ionicons name='receipt' size={25} color={'lightgray'} />
              <Text style={{ color: 'gray' }}>5 Bookings</Text>
            </View>
            <View style={{ alignItems: 'center',margin:2, }}>
              <Ionicons name='chatbox' size={25} color={'lightgray'} />
              <Text style={{ color: 'gray' }}>7 Messages</Text>
            </View>
            
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ServiceProviderDashBord
