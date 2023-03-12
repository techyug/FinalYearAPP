import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, Pressable, Alert, } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../Redux/actions';
import { connectToSocket } from '../Constants/GlobalSocket';
const styles = StyleSheet.create({
    profileTab: {
        flex: 1,
        backgroundColor:'white'

    },
    userdetails: {
        paddingTop: 20,
        backgroundColor: "#fff",
        borderRadius: 10,

        width: '100%',
        alignItems: 'center',
        height: '80%'
    },
    userAction: {

        width: "90%",
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#f97',
        paddingVertical: 10,
        borderRadius: 8,
        margin: 1
    }
})

const Proflletab = () => {
    const navigation = useNavigation();
    const default_profile = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    const dispatch = useDispatch();
    const user = useSelector(state => state.userData)
var socket = connectToSocket()
    const userLogoutConstant = () => {
        dispatch(userLogout())
        socket.disconnect()
        AsyncStorage.removeItem('@userData');
        navigation.replace('Login')
    }
    return (
        <View style={{flex:1}}>
            <ScrollView  style={{flex:1}}  contentContainerStyle={{alignItems:'center'}} >

                <TouchableOpacity style={{ backgroundColor: 'red', borderColor: 'white', borderWidth: 1, flexDirection: 'row', width: "50%", padding: 10, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center',alignSelf:'flex-end',margin:20,elevation:8 }} activeOpacity={0.6} onPress={userLogoutConstant}  >

                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Logout</Text>
                    <Ionicons name='exit' size={30} color="white"/>
                </TouchableOpacity>
                <Image
                    source={{ uri: user.user_image_url ? user.user_image_url : default_profile }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text>{user.user_name}</Text>
                <Text>{user.user_phone}</Text>
                <Text>{user.user_email}</Text>
                <Pressable style={styles.userAction} onPress = {()=>Alert.alert("Conversations","We are working on this feature")}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Conversations</Text>
                    <Ionicons name='arrow-forward' size={20} color='white'/>
                </Pressable>

                <Pressable style={styles.userAction} onPress = {()=>Alert.alert("Help","We are working on this feature")}>

                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Help</Text>
                    <Ionicons name='arrow-forward' size={20} color='white'/>
                </Pressable>
                <Pressable style={styles.userAction} onPress = {()=>Alert.alert("Invite","We are working on this feature")}>

                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Invite</Text>
                    <Ionicons name='arrow-forward' size={20} color='white'/>
                </Pressable>
            </ScrollView>
        </View>
    )
}

export default Proflletab

