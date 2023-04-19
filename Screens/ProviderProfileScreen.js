import { Text, View, Pressable, FlatList, ScrollView, RefreshControl ,Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo, userLogout } from '../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as ImagePicker from 'expo-image-picker';
import { serverIP } from '../Constants/IPofBackned';
import { useNavigation } from '@react-navigation/native';
import { defaultAvatarImage } from '../Constants/Gconstants';
import { ActivityIndicator } from 'react-native-paper';
import { callApi } from '../Constants/Async_functions';
import { connectToSocket } from '../Constants/GlobalSocket';
import { Image, Skeleton } from '@rneui/base';

const ProviderProfileScreen = (props) => {
    const [image, setImage] = useState("");
    const [imageResult, setImageResult] = useState(null)
    const userData = useSelector(state => state.userData)
    const [dataofServicesbyapi, setdataofServicesbyapi] = useState([])
    const [loadedAssignedServices, setloadedAssignedServices] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    console.log(props.route.params)
    const socket = connectToSocket()
    const userLogoutConstant = () => {

        socket.emit('im-not-active', { token: userData.token })
        socket.disconnect();
        dispatch(userLogout())
        AsyncStorage.removeItem('@userData');
        // navigation.replace('Login')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }
    useEffect(() => {
        if (!loadedAssignedServices) {
            callApi(serverIP + '/services-of-provider/' + userData.ServiceProviderId).then(res => {
                setdataofServicesbyapi(res.data)
                setloadedAssignedServices(true)
            }).catch(e => {
                setloadedAssignedServices(true)
                dispatch(updateInfo({ msg: e.toString(), show: true, infoType: "Error" }));
            })
        }

    }, [])
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
            userData.ServiceProviderImage = r.data.imageUrl
            setImage("")

        }).catch(e => {
            console.log(e)
        })
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
    if (userData === null) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    } else
        return (
            <View style={{ alignItems: 'center', padding: 10 }}>
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', }}
                    refreshControl={
                        <RefreshControl refreshing={!loadedAssignedServices} />
                    }
                >
                    <Pressable style={{ backgroundColor: 'red', alignSelf: 'flex-end', padding: 7, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 20, alignItems: 'center', elevation: 8, borderWidth: 2, borderColor: 'white' }} onPress={userLogoutConstant}>
                        <Text style={{ color: 'white', fontSize: 15 }}>Logout</Text>
                        <Ionicons name='log-out' size={30} color={'white'} />
                    </Pressable>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Ionicons name='add-circle-outline' size={25} color='blue' onPress={pickImage} style={{ position: 'relative', left: 50, top: 30, zIndex: 10 }} />
                        <Image
                        
                            PlaceholderContent={<Skeleton animation='wave' rounded size={23} />}
                            source={{ uri: image ? image : '' || userData.ServiceProviderImage ? serverIP + userData.ServiceProviderImage : defaultAvatarImage }}
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
                    <Text>{userData.ServiceProvideName}</Text>
                    <Text>{userData.ServiceProviderPhone}</Text>

                    <FlatList style={{ borderBottomWidth: 2, borderColor: 'blue', padding: 10, borderRadius: 10, backgroundColor: 'white' }} data={dataofServicesbyapi} horizontal ListFooterComponent={() => (
                        <Ionicons onPress={() => navigation.navigate('AddServiceFromScreen')} name='add-circle' size={50} style={{ alignSelf: 'center' }} />
                    )} renderItem={({ item, index }) => (
                        <Pressable onPress={() => {
                            navigation.navigate('ServiceofProviderScreen', { serviceData: item })
                        }}>
                            <Image source={{ uri: item.service_img}} PlaceholderContent={<ActivityIndicator/>}  resizeMode={'cover'} style={{ borderRadius: 25, margin: 2, height: 50, width: 50 , borderWidth: 1, borderColor: 'red' }} />

                        </Pressable>
                    )}
                    />
                </ScrollView>




            </View>
        )
}

export default ProviderProfileScreen