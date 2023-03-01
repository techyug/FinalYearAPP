import { StatusBar, StyleSheet, Text, View,Button } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ServiceProviderDashBord = () => {
    
    const navigation= useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.userData)
    const userLogoutConstant = ()=>{
        dispatch(userLogout());
        AsyncStorage.removeItem('@userData');
        navigation.replace('Login')
    }
  return (
    <View>
      <StatusBar barStyle={'default'} backgroundColor={'rgb(80,80,255)'}/>
     <Button title='Logout' onPress={userLogoutConstant}/>  
     <Text>{userData.ServiceProvideName}</Text>   
    </View>
  )
}

export default ServiceProviderDashBord

const styles = StyleSheet.create({})