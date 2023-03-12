import { View, Text, Image, ScrollView, Button,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { defaultAvatarImage } from '../Constants/Gconstants';
import { Ionicons } from '@expo/vector-icons';
import { Axios } from 'axios';
import { Input } from 'react-native-elements';



const ServiceProviderShowcase = (props) => {
    const navigation = useNavigation();
    const [chatboxHeight, setchatboxHeight] = useState(60)
    const p = { "CreatedAt": "2023-02-28T15:31:40.000Z", "ProviderStatus": "New Provider", "ServiceProvideName": "Kaushalendra ", "ServiceProviderEmail": "Ttststys@gmail.com", "ServiceProviderId": 1, "ServiceProviderIdinMap": 1, "ServiceProviderImage": null, "ServiceProviderPassword": "54321", "ServiceProviderPhone": "9696567462", "service_description": "All type of Camera operators", "service_id": 1, "service_img": "https://img.freepik.com/free-vector/videographer-concept-illustration_114360-1439.jpg", "service_title": "Camera man", "super_cat_id": 2 }
    const ProviderData = props.route.params.ProviderData


    useEffect(() => {
        navigation.setOptions({ title: ProviderData.ServiceProvideName })

        return () => {

        }
    }, [])

    const openchatBox = () => {
        if (chatboxHeight == 300) {
            setchatboxHeight(60);
        } else setchatboxHeight(300)

    }
    const ProviderNameBox = () =>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5, paddingVertical: 0, alignItems: 'center', backgroundColor: 'white', borderRadius: 20, elevation: 2, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Image style={{ borderRadius: 30, borderColor: 'red', borderWidth: 2 }} source={{ uri: p.ServiceProviderImage || defaultAvatarImage, height: 60, width: 60 }} />
                <View style={{ justifyContent: "space-evenly", marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{p.ServiceProvideName}</Text>
                    <Text style={{ backgroundColor: 'blue', color: 'white', borderRadius: 10, textAlign: 'center', padding: 3, fontSize: 12 }}>{p.service_title}</Text>
                </View>
            </View>
            <View>
                <Text>{p.ProviderStatus}</Text>
            </View>
        </View>

    return (
        <View style={{ flex: 1, paddingHorizontal: 0, backgroundColor: 'rgb(230,230,230)' }}>
            <ScrollView contentContainerStyle={{ padding: 15, paddingTop: 0 }} >

                <Image source={{ uri: p.service_img, height: 200 }} />
                <ProviderNameBox />
                <Text style={{ fontSize: 18 }} >Reviews</Text>
                <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: 'white', alignSelf: 'flex-start', padding: 5, position: 'relative', zIndex: -1, elevation: 5 }}>
                        <Text>Aman :</Text>
                        <Text style={{ fontWeight: '900' }}>Very Nice</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text> 5</Text>
                            <Ionicons name='star' size={15} color='green' />
                        </View>

                    </View>
                    <View style={{ elevation: 5, backgroundColor: 'white', padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                        <Text>this is  a big review to this provide i am ipressd this is  a big review to this provide i am ipressd </Text>
                        <ScrollView horizontal scrollEnabled={true} contentContainerStyle={{ padding: 10 }}>
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                        </ScrollView>
                    </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', borderTopRightRadius: 10, borderTopLeftRadius: 10, alignItems: 'center', backgroundColor: 'white', alignSelf: 'flex-start', padding: 5, position: 'relative', zIndex: -1, elevation: 5 }}>
                        <Text>Aman :</Text>
                        <Text style={{ fontWeight: '900' }}>Very Nice</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text> 5</Text>
                            <Ionicons name='star' size={15} color='green' />
                        </View>

                    </View>
                    <View style={{ elevation: 5, backgroundColor: 'white', padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                        <Text>this is  a big review to this provide i am ipressd this is  a big review to this provide i am ipressd </Text>
                        <ScrollView horizontal scrollEnabled={true} contentContainerStyle={{ paddingLeft: 10 }}>
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                            <Image source={{ uri: defaultAvatarImage, width: 100, height: 100 }} style={{ margin: 5 }} />
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: chatboxHeight, borderTopWidth: 2, elevation: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', padding: 10, }}>
                    <Button title='Chat' onPress={openchatBox} color={'orange'} />
                    <Button title='Send Booking request' color={'green'} />
                </View>
                {
                    chatboxHeight != 60 &&
                    <View style={{backgroundColor:'white',flex:1}}>
                       <TextInput placeholder='hdi'/>
                        <Input placeholder='Write message' style={{paddingRight:20,borderWidth:0}}  containerStyle={{paddingHorizontal:20,borderBottomWidth:0}}  rightIcon={()=>(<Ionicons name='send' style={{}} size={25} color={'green'}/>)}/>
                    </View>
                }
            </View>
        </View>
    )
}

export default ServiceProviderShowcase