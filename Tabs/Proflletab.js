import { StyleSheet, Button, Image, Text, View, TouchableOpacity, } from 'react-native'
import React, { useEffect } from 'react'
import * as Battery from 'expo-battery';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';




import { useState } from 'react'
import axios from 'axios';
import { serverIP } from '../Constants/IPofBackned';
const Proflletab = () => {

    const navigation = useNavigation();
    const [userPhone, setUserPhone] = useState('');
    const [user, setUser] = useState(null);
    const default_profile = "https://i.stack.imgur.com/34AD2.jpg"


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_phone')
            if (value !== null) {
                // value previously stored
                setUserPhone(value);
            }

        } catch (e) {
            // error reading value
            console.log(e)

        }
    }
    const removeItem = async () => {
        await AsyncStorage.removeItem('@user_phone')
    }
    const styles = StyleSheet.create({
        profileTab: {
            flex: 1,
            alignItems: "center",
            padding: 20,
            paddingTop: 40
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
    if (user === null) {
        getData();
        axios.get(serverIP + '/user/' + userPhone, {})
            .then(res => {
                setUser(res.data);
            }).catch(err => {
                console.log(serverIP + '/login');
                console.log(err);
            })
    }
    return (
        <View style={styles.profileTab}>
            {user ?
                (
                    <View style={styles.userdetails} >

                        <Image
                            source={{ uri: user.user_image_url ? user.user_image_url : default_profile }}
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                        <Text>{user.user_name}</Text>
                        <Text>{user.user_phone}</Text>
                        <Text>{user.user_email}</Text>
                        <TouchableOpacity activeOpacity={0.6} style={styles.userAction}>

                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Conversations</Text>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, }}>{">"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} style={styles.userAction}>

                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Help</Text>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, }}>{">"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} style={styles.userAction}>

                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Invite</Text>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, }}>{">"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: 'gray', flexDirection: 'row', width: "80%", padding: 10, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', position: 'absolute', bottom: 0 }} activeOpacity={0.6} onPress={() => {
                            removeItem();
                            navigation.replace('Login')


                        }}  >

                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Logout</Text>
                            <IonIcon name='exit' size={30} color={'white'} />
                        </TouchableOpacity>
                    </View>

                )
                :
                <View>
                    <Text>Something went wrong</Text>
                </View>
            }



        </View>
    )
}

export default Proflletab

