import { FlatList, StyleSheet, Text, TouchableOpacity, View, Button, Alert,Image, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { serverIP } from '../Constants/IPofBackned';
import { defaultAvatarImage } from '../Constants/Gconstants';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../Redux/actions';

const ServiceScreen = (props) => {
    const navigation = useNavigation();
    const [serviceData, setServiceData] = useState();
    const [serviceProviders, setServiceProviders] = useState([])
    const [loaded, setloaded] = useState(false)
    const dispatch = useDispatch();
    if (serviceData == undefined) {
        setServiceData(props.route.params.ServiceData)
    }
    useEffect(() => {
        navigation.setOptions({ title: serviceData.service_title })
        if (!loaded) {
            axios.get(serverIP + '/service-providers/' + serviceData.service_id)
                .then(res => {
                    let arr = res.data;
                    setServiceProviders(arr)
                    console.log(arr)
                    setloaded(true)

                }).catch(err => {
                    console.log(serverIP + '/service-providers/3');
                    console.log(err);
                    dispatch(updateInfo({msg:err.toString(),show:true,infoType:"Error"}));
                    setloaded(true)
                })
        }
    }, [loaded])

    const onRefresh = ()=>{
        setloaded(false)
    }
    return (
        <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: 'white', paddingVertical: 5 }}>
            
            <FlatList
                data={serviceProviders}
                refreshControl = {
                    <RefreshControl refreshing={!loaded} onRefresh={onRefresh} />
                  }
                renderItem={({item,index}) => (
                    <TouchableOpacity activeOpacity={0.4}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderWidth: 0, margin: 2, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 10 ,height:80,alignItems:'center'}}>
                            
                            <Image
                                source={{ uri: item.ServiceProviderImage || defaultAvatarImage }}
                                style={{ width: 60, height: '100%', borderRadius: 10 }}
                            />
                            <Text style={{fontSize:18}}>
                                {item.ServiceProvideName}
                            </Text>
                            <Button title='Chat' onPress={() => Alert.alert("Next work is Pending", "we are working on this")} />

                        </View>

                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default ServiceScreen

const styles = StyleSheet.create({})