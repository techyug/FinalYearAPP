import { Text, View, Image, Pressable, FlatList, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo, userLogout } from '../Redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Axios from 'axios'
import { serverIP } from '../Constants/IPofBackned';
import { useNavigation } from '@react-navigation/native';
import { defaultAvatarImage } from '../Constants/Gconstants';
import { ActivityIndicator } from 'react-native-paper';

const ProviderProfileScreen = (props) => {
    const userData = useSelector(state => state.userData)
    const [dataofServicesbyapi, setdataofServicesbyapi] = useState([])
    const [loadedAssignedServices, setloadedAssignedServices] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    console.log(props.route.params)

    const userLogoutConstant = () => {
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
            Axios.get(serverIP + '/services-of-provider/' + userData.ServiceProviderId).then(res => {
                setdataofServicesbyapi(res.data)
                setloadedAssignedServices(true)
            }).catch(e => {
                setloadedAssignedServices(true)
                dispatch(updateInfo({ msg: e.toString(), show: true, infoType: "Error" }));
            })
        }

    }, [])
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
                    <Image source={{ uri: userData.ServiceProviderImage || defaultAvatarImage }} style={{ height: 200, width: 200 }} resizeMode={'center'} />
                    <Text>{userData.ServiceProvideName}</Text>
                    <Text>{userData.ServiceProviderPhone}</Text>

                    <FlatList style={{ borderBottomWidth: 2, borderColor: 'blue', padding: 10, borderRadius: 10, backgroundColor: 'white' }} data={dataofServicesbyapi} horizontal ListFooterComponent={() => (
                        <Ionicons onPress={() => navigation.navigate('AddServiceFromScreen')} name='add-circle' size={50} style={{ alignSelf: 'center' }} />
                    )} renderItem={({ item, index }) => (
                        <Pressable onPress={() => {
                            navigation.navigate('ServiceofProviderScreen', { serviceData: item })
                        }}>
                            <Image source={{ uri: item.service_img, height: 50, width: 50 }} resizeMode={'cover'} style={{ borderRadius: 25, margin: 2, borderWidth: 1, borderColor: 'red' }} />

                        </Pressable>
                    )}
                    />
                </ScrollView>




            </View>
        )
}

export default ProviderProfileScreen