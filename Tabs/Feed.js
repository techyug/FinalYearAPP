import { StyleSheet, Image, Text, View, StatusBar, ImageBackground, RefreshControl, Pressable, Alert, TextInput, FlatList } from 'react-native'

import React, { useEffect, useRef, useState } from 'react'
import { serverIP } from '../Constants/IPofBackned';

import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../Redux/actions';
import { callApi } from '../Constants/Async_functions';
import { SearchBar } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons/MaterialIcons';
import Icon from 'react-native-ionicons';
import { Ionicons } from '@expo/vector-icons';
import { SearchResults } from '../Constants/SearchResults';

const styles = StyleSheet.create({
    feedScreen: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
        backgroundColor: 'white'

    }
    ,
    AppName: {
        fontSize: 35,
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
        borderColor: 'rgba(200,0,100,1)',
        elevation: 4,
        
    },
    gridView: {
        height: 300
    }


});

const Feed = () => {
    const navigation = useNavigation();
    const [searching,SetSearching] = useState(false)
    const dispatch = useDispatch()
    const [CategoriesData, setCategoryData] = useState([]);
    const [loaded, setloaded] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchRes,setSearchRes] = useState([]);
    const searchRef = useRef(null)
    useEffect(() => {
        if (!loaded)
            callApi(serverIP + '/services', 'GET').then(res => {
                setCategoryData(res.data);
                setloaded(true)

            }).catch(err => {

                console.log(err);
                setloaded(true)
                dispatch(updateInfo({ msg: err.toString(), show: true, infoType: "Error" }));
            })

    }, [loaded])

    const onRefresh = () => {
        setloaded(false)
    }
    const onChangeText = (text) => {
        
        if(text.length<searchText){
            setSearchText(text)
            handleLocalSearch(text)
        }
        else{
            if(searchText.length>3){
                setSearchText(text)
                handleSearch(text)
            }else{
                setSearchText(text)
                handleLocalSearch(text)
            }
        }
        
        

    }
    function handleLocalSearch(query){
        
        const data = CategoriesData.filter((item,index)=>item.service_title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        setSearchRes(data)
    }
    function handleSearch(query){
        callApi(serverIP+'/search-service/'+query,'GET').then(res=>{
            setSearchRes(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const ListHeader = () =>
        <>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 0 }}>
                <Text style={styles.AppName}>HelpMeet</Text>
                <View style={{ borderWidth: 0, width: '70%', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                </View>
            </View>



        </>
    return (
        <View style={styles.feedScreen} >

            <StatusBar barStyle={'default'} backgroundColor={'rgba(200,0,100,1)'} />

            <ListHeader />
            <SearchBar ref={searchRef}
                
                lightTheme style={{ borderWidth: 0 }}
                placeholder='Search Services...' cursorColor={'blue'}
                value={searchText}
                inputStyle={{ color: 'blue' }}
                onChangeText={onChangeText}
                round searchIcon={<Ionicons name='search-outline' size={30} color='blue' />}
                containerStyle={{ backgroundColor: 'transparent', padding: 0, borderWidth: 0, marginVertical: 10 }}
                inputContainerStyle={{ backgroundColor: 'white', borderWidth: 1, borderBottomWidth: 1, borderColor: 'blue' }} />
            {
               searchText.length>=1 &&
               <FlatList
               data={searchRes}
               style={[styles.gridView,{height:200,}]}
              
               renderItem={({ item, index }) => (
                   <Pressable
                       onPress={() => {
                           navigation.navigate('Service', {
                               ServiceData: item
                           });
                       }}
                       style={[styles.CatFlex,{flexDirection:'row',justifyContent:'flex-start',width:'98%',paddingVertical:5}]}>
                       <Image

                           alt={item.service_title}

                           source={{ uri: item.service_img }}
                           style={{ width: 60, height: 60 }}
                       />
                       <Text style={{ fontWeight: 'bold' }} >{item.service_title}</Text>
                   </Pressable>
               )}
           />
                
                
            }
            

           {
            searchText.length==0 &&
            <>
            <Pressable onPress={() => Alert.alert("Fast Delivery Banner", "We are working on this")}>
                <View style={{ display: 'flex', borderRadius: 20, backgroundColor: 'red', elevation: 8, overflow: 'hidden', borderColor: 'white', borderWidth: 1 }} >
                    <ImageBackground style={{ borderRadius: 20 }} source={{ uri: 'https://thumbs.dreamstime.com/b/delivery-company-worker-holding-grocery-box-food-order-supermarket-service-181612662.jpg' }} >
                        <View style={{ flexDirection: 'column-reverse', height: 120 }}>
                            <Text style={{ backgroundColor: 'rgba(0,0,0,0.5)', fontWeight: 'bold', alignSelf: 'center', borderRadius: 20, padding: 5, color: 'white', fontSize: 20 }}>Get Items Delivered in 10 Minutes</Text>
                        </View>
                    </ImageBackground>
                </View>
            </Pressable>
             <FlatGrid
                // ListHeaderComponent={ListHeader}
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
            </>
            
           }
        </View>
    )
}
export default Feed

