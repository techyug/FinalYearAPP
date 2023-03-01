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
      <View style={{ height: profileOpen ? '100%' : 60 }}>
        <View style={{ flex: profileOpen ? 1 : 0, padding: 5, backgroundColor: "white", borderRadius: 10, elevation: 5 }}>
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
            <View>
              <Text>Name :{userData.ServiceProvideName} </Text>
              <Text>Phone :{userData.ServiceProviderPhone}</Text>
              <Text>Email :{userData.ServiceProviderEmail} </Text>
              <View>
                <Button title='Logout' onPress={userLogoutConstant} />
              </View>
            </View>
          }
        </View>
      </View>
      <ScrollView style={{ height: '100%' }}>
        
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

const styles = StyleSheet.create({})