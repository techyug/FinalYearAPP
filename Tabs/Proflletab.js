import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, Pressable, Alert, Button, Linking, } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../Redux/actions';
import { connectToSocket } from '../Constants/GlobalSocket';
import { defaultAvatarImage } from '../Constants/Gconstants';
import { callApi } from '../Constants/Async_functions';
import { serverIP } from '../Constants/IPofBackned';
const styles = StyleSheet.create({
    profileTab: {
        flex: 1,


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
        margin: 1,
        alignItems: 'center'
    }
})


const Proflletab = () => {
    const [image, setImage] = useState("");
    const [imageResult, setImageResult] = useState(null)
    const navigation = useNavigation();
    const default_profile = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    const dispatch = useDispatch();
    const user = useSelector(state => state.userData)

    const messages = useSelector(s => s.messages)
    var socket = connectToSocket()
    const userLogoutConstant = () => {
        dispatch(userLogout())
        socket.emit('im-not-active', { token: user.token })
        socket.disconnect()
        AsyncStorage.removeItem('@userData');
        navigation.replace('Login')
    }



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result)
        if (!result.canceled) {

            setImage(result.assets[0].uri);
            setImageResult(result)

        }
    };
    const handleImageUpload = () => {
        const formData = new FormData();
        const uriParts = imageResult.assets[0].uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const fileName = `image-${Date.now()}.${fileType}`;
        formData.append('image', {
            uri: imageResult.assets[0].uri,
            type: 'image/jpeg',
            name: fileName

        });

        callApi(serverIP + '/profile_picture', 'POST', formData).then(r => {
            console.log(r.data)
            user.user_image = r.data.imageUrl
            setImage("")

        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }} >

                <TouchableOpacity style={{ backgroundColor: 'red', borderColor: 'white', borderWidth: 1, flexDirection: 'row', width: "50%", padding: 10, borderRadius: 10, justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', alignSelf: 'flex-end', margin: 20, elevation: 8 }} activeOpacity={0.6} onPress={userLogoutConstant}  >

                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Logout</Text>
                    <Ionicons name='exit' size={30} color="white" />
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Ionicons name='add-circle-outline' size={25} color='blue' onPress={pickImage} style={{ position: 'relative', left: 50, top: 30, zIndex: 10 }} />

                    <Image
                        source={{ uri: image ? image : '' || user.user_image ? serverIP + user.user_image : defaultAvatarImage }}
                        style={[{ borderWidth: 1, borderColor: 'blue' }, image ? { width: 200, height: 200, borderRadius: 100, } : { width: 100, height: 100, borderRadius: 50, }]}
                    />
                    {
                        image &&
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginBottom: 20 }}>
                            <Button title='cancel' onPress={() => setImage(null)} />
                            <Button title='Save' onPress={handleImageUpload} />
                        </View>
                    }
                </View>


                <Text>{user.user_name}</Text>
                <Text>{user.user_phone}</Text>
                <Text>{user.user_email}</Text>
                <Pressable style={[styles.userAction,{backgroundColor:'rgba(200,0,100,1)'}]} onPress={() => {
                    navigation.navigate('UserChatScreen')
                }}>
                    <View style={{ flexDirection: 'row', }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name='chatbox-ellipses-outline' color={'white'} size={30} />
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, marginHorizontal: 10, alignSelf: 'center' }}>Messages</Text>

                        </View>                        
                        <Text style={{ alignSelf: 'center', marginLeft: 5, backgroundColor: 'red', borderRadius: 10, padding: 7, color: 'white' }} >{messages.length}</Text>
                    </View>
                    <Ionicons name='arrow-forward' size={20} color='white' />
                </Pressable>

                <Pressable style={styles.userAction} onPress={() => {
                    navigation.navigate('MyBookings')
                }} >

                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='bookmark' color={'white'} size={30} />
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, marginHorizontal: 10, alignSelf: 'center' }}>My Bookings</Text>
                    </View>
                    <Ionicons name='arrow-forward' size={20} color='white' />
                </Pressable>
                <Pressable style={[styles.userAction, { backgroundColor: 'rgba(0,100,0,1)', borderWidth: 1, borderColor: 'green' }]} onPress={() => {

                    Linking.openURL('whatsapp://send?text=' + "hi install my app").then(() => {
                        console.log("Whatsapp openned")
                    }).catch(e => {
                        console.log("cannot open whatsapp")
                    });
                }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name='logo-whatsapp' color={'white'} size={30} />
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, marginHorizontal: 10, alignSelf: 'center' }}>Invite</Text>

                    </View>
                    <Ionicons name='arrow-forward' size={20} color='white' />
                </Pressable>
            </ScrollView>
        </View>
    )
}

export default Proflletab

