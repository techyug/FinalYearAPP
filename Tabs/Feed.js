import { StyleSheet, FlatList, TouchableOpacity, Image, Text, View } from 'react-native'

import React, { useState } from 'react'
import axios from 'axios';
import { serverIP } from '../Constants/IPofBackned';

import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    feedScreen: {
        flex:1,
        paddingTop: 40,
        paddingHorizontal: 10,
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
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'rgb(255,0,100)',
        elevation:10

    },


});

const Feed = () => {
    const navigation = useNavigation();


    
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
    console.log(CategoriesData[0])
    return (
        <View style={styles.feedScreen} >
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 10 }}>
                <Text style={styles.AppName}>HelpMeet</Text>
                <View style={{ borderWidth: 0, width: '70%', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                </View>
            </View>
            <View>

                {/* <FlatList
                    data={CategoriesData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ backgroundColor: 'rgba(240,0,0,0.05)', borderRadius: 10, flexDirection: 'row', padding: 5, }}
                    renderItem={(item) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.5}

                                onPress={() => { alert('Clicked on ' + item.item.service_title) }}
                                style={styles.CatFlex}>
                                <Image
                                    source={{ uri: item.item.service_img }}
                                    style={{ width: 60, height: 60, borderRadius: 10 }}
                                />
                                <Text style={{ fontWeight: 'bold' }} >{item.item.service_title}</Text>
                            </TouchableOpacity>


                        );
                    }}
                    keyExtractor={(cat) => { return cat.service_id; }}
                /> */}

            </View>
            <FlatGrid
                itemDimension={100}
                data={CategoriesData}
                style={styles.gridView}
                // staticDimension={440}
                fixed
                spacing={5}
                renderItem={({item,index}) => (
                    <TouchableOpacity
                        activeOpacity={0.5}

                        onPress={()=>
                            {
                            navigation.navigate('Service',{
                            ServiceData:item
                          });
                        }
                        }
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

