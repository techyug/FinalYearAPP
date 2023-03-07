import { StyleSheet, FlatList, TouchableOpacity, Image, Text, View, StatusBar, ImageBackground, ScrollView, RefreshControl, Pressable, Alert } from 'react-native'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { serverIP } from '../Constants/IPofBackned';
import Carousal from 'react-native-snap-carousel'
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../Redux/actions';

const styles = StyleSheet.create({
    feedScreen: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white'

    }
    ,
    AppName: {
        fontSize: 40,
        paddingLeft: 20,
        fontWeight: '900',
        color: 'rgb(255,0,100)',
        alignSelf: 'flex-start'
    },
    container: {
        height: "100%",
        backgroundColor: 'white',
        paddingTop: 40,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
    },

    categoryStyle: {
        margin: 5


    },
    CatFlex: {
        height: 100,
        width: 100,
        color: 'black',
        margin: 4,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
        borderColor: 'white',
        elevation: 4,
    },
    gridView: {
        height: 300
    }


});

const Feed = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const userData = useSelector(state => state.userData)
    const [CategoriesData, setCategoryData] = useState([]);
    const [loaded, setloaded] = useState(false)
    useEffect(() => {
        if (!loaded)
            axios.get(serverIP + '/services/')
                .then(res => {
                    setCategoryData(res.data);
                    setloaded(true)

                }).catch(err => {
                    console.log(serverIP + '/login');
                    console.log(err);
                    setloaded(true)
                    dispatch(updateInfo({ msg: err.toString(), show: true, infoType: "Error" }));
                })

    }, [loaded])

    const onRefresh = () => {
        setloaded(false)
    }
    const ListHeader = () =>
        <>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 0 }}>
                <Text style={styles.AppName}>HelpMeet</Text>
                <View style={{ borderWidth: 0, width: '70%', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                </View>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' ,marginBottom:10}}>Welcome {userData.user_name}</Text>
            <Pressable onPress={()=>Alert.alert("Fast Delivery Banner","We are working on this")}>
            <View style={{ display: 'flex', borderRadius: 20, backgroundColor: 'red', elevation: 8, overflow: 'hidden', borderColor: 'white', borderWidth: 1 }} >
                <ImageBackground style={{ borderRadius: 20 }} source={{ uri: 'https://thumbs.dreamstime.com/b/delivery-company-worker-holding-grocery-box-food-order-supermarket-service-181612662.jpg' }} >
                    <View style={{ flexDirection: 'column-reverse', height: 120 }}>
                        <Text style={{ backgroundColor: 'rgba(0,0,0,0.5)', fontWeight: 'bold', alignSelf: 'center', borderRadius: 20, padding: 5, color: 'white', fontSize: 20 }}>Get Items Delivered in 10 Minutes</Text>
                    </View>
                </ImageBackground>
            </View>
            </Pressable>
        </>
    return (
        <View style={styles.feedScreen} >
           <StatusBar barStyle={'default'} backgroundColor={'rgb(200,0,100)'} />
            <FlatGrid
                ListHeaderComponent={ListHeader }
                itemDimension={100}
                data={CategoriesData}
                
                refreshControl={

                    <RefreshControl refreshing={!loaded} onRefresh={onRefresh} title="Loading" />
                }
                style={styles.gridView}
                spacing={5}
                renderItem={({ item, index }) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Service', {
                                ServiceData: item
                            });
                        }}
                        style={styles.CatFlex}>
                        <Image

                            alt={item.service_title}

                            source={{ uri: item.service_img }}
                            style={{ width: 60, height: 60 }}
                        />
                        <Text style={{ fontWeight: 'bold' }} >{item.service_title}</Text>
                    </Pressable>
                )}
            />
        </View>
    )
}
export default Feed

