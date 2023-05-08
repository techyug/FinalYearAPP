import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { callApi } from '../Constants/Async_functions'
import { serverIP } from '../Constants/IPofBackned'
import { useDispatch } from 'react-redux'
import { updateInfo } from '../Redux/actions'

const ServiceofProviderScreen = (props) => {
    const serviceData = props.route.params.serviceData
    const navigation = useNavigation()
    const dispatch = useDispatch()
    let d = { "CreatedAt": "2023-03-01T16:24:51.000Z", "ProviderStatus": "New Provider", "ServiceAddress": "{\"postalCode\":\"261121\",\"country\":\"India\",\"isoCountryCode\":\"IN\",\"subregion\":\"Lucknow Division\",\"city\":\"Kurkuli\",\"street\":null,\"district\":null,\"name\":\"PPGW+5Q\",\"streetNumber\":null,\"region\":\"Uttar Pradesh\",\"timezone\":null}", "ServiceLatitude": "27.726638", "ServiceLongitude": "80.748637", "ServicePincode": 261121, "ServiceProvideName": "Yogendra singh", "ServiceProviderEmail": "moralfun0@gmail.com", "ServiceProviderId": 2, "ServiceProviderIdinMap": 2, "ServiceProviderImage": "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png", "ServiceProviderPassword": "567890", "ServiceProviderPhone": "8429582215", "ServiceStatus": "Requested for approval", "service_description": "All type of Wall paint, Furniture Paint...", "service_id": 5, "service_img": "https://www.shutterstock.com/image-vector/painter-man-painting-house-wall-260nw-1342265405.jpg", "service_title": "Painter", "super_cat_id": 1 }
    useEffect(() => {
        navigation.setOptions({ title: serviceData.service_title,
        
        })
    }, [])

    return (
        <View style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
            <ScrollView>
            {/* <View style={{position:'absolute',zIndex:10,right:0}}>
                    <Text style={{ backgroundColor: 'green', color: 'white', padding: 5, alignSelf: 'flex-end', borderRadius: 10 }}>
                        {serviceData.ServiceStatus}
                    </Text>
                </View> */}
                <View style={{ borderBottomWidth: 1 }} >
                    <Image source={{ uri: serviceData.service_img, height: 200 }} resizeMode={'center'} />
                </View>
                <View style={{flexDirection:'row',alignItems:'center',padding:5}} >
                    <Ionicons name='location' size={20} />
                    <Text>Pincode: {serviceData.ServicePincode}</Text>
                </View>

                <View style={{flexDirection:'row-reverse',borderBottomWidth:    1,borderColor:'lightgray',paddingBottom:5}}>
                <Pressable onPress={() => navigation.navigate('Home', { screen: 'Bookings' })} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='calendar' size={25} color='white' />
                        <Text style={{ color: 'white', fontSize: 18, marginLeft: 8 }}>All Bookings</Text>
                    </View>
                    {/* <Ionicons name='chevron-forward' size={25} color="white"/> */}
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Home', { screen: 'Conversation' })} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='chatbox' size={25} color='white' />
                        <Text style={{ color: 'white', fontSize: 18, marginLeft: 8 }}>All Messages</Text>
                    </View>
                </Pressable>
                </View>
                <Pressable onPress={() => {
                    callApi(serverIP+'/delete-my-service','POST',{serviceData}).then(res=>{
                        console.log(res.data)
                        
                        dispatch(updateInfo({ msg: res.data, show: true, infoType: "Success" }));
                    }).catch(err=>{
                        console.log(err)
                    })
                }} style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='remove-circle-sharp' size={25} color='white' />
                        <Text style={{ color: 'white', fontSize: 18, marginLeft: 8 }}>Remove Service</Text>
                    </View>
                </Pressable>

            </ScrollView>
        </View>
    )
}

export default ServiceofProviderScreen