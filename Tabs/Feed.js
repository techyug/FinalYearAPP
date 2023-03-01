import { StyleSheet, FlatList, TouchableOpacity, Image, Text, View, StatusBar } from 'react-native'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { serverIP } from '../Constants/IPofBackned';

import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    feedScreen: {
        flex:1,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor:'white'
        
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
        borderWidth:1,
        borderColor:'white',
        elevation:4,
    },


});

const Feed = () => {
    const navigation = useNavigation();
    const userData = useSelector(state=>state.userData)
    const [CategoriesData, setCategoryData] = useState([]);
    if (CategoriesData.length < 1) {
        axios.get(serverIP + '/services/')
            .then(res => {
                setCategoryData(res.data);
               
            }).catch(err => {
                console.log(serverIP + '/login');
                console.log(err);
            })
    }
    
   
    return (
        <View style={styles.feedScreen} >
            <StatusBar barStyle={'default'} />
            
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 0 }}>
                <Text style={styles.AppName}>HelpMeet</Text>

                <View style={{ borderWidth: 0, width: '70%', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                    
                </View>
            </View>
            <Text style={{fontSize:20,fontWeight:'bold',color:'blue'}}>Welcome {userData.user_name}</Text>
            <FlatGrid
                itemDimension={100}
                data={CategoriesData}
                style={styles.gridView}
                spacing={5}
                renderItem={({item,index}) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>{
                            navigation.navigate('Service',{
                            ServiceData:item
                          });
                        }}
                        style={styles.CatFlex}>
                        <Image
                            source={{ uri: item.service_img }}
                            style={{ width: 60, height: 60, borderRadius: 10 }}
                        />
                        <Text style={{ fontWeight: 'bold' }} >{item.service_title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
export default Feed

