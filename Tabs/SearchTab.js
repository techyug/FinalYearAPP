import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet,Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import axios from 'axios'
import { serverIP } from '../Constants/IPofBackned'
import { useNavigation } from '@react-navigation/native'

const SearchTab = () => {
    const navigation = useNavigation();
    const [SearchResults, setSearchResults] = useState([]);
    const [searchTearm, setsearchTearm] = useState("");
    const handleSearch = () => {
        axios.get(serverIP + '/search-service/' + searchTearm)
            .then(res => {
                let arr = res.data;
                setSearchResults(arr);
            }).catch(err => {
                console.log(serverIP + '/service-providers/3');
                console.log(err);
            })
    }
    return (
        <KeyboardAvoidingView style={{ paddingTop: 10, paddingHorizontal: 20, flex: 1 }}>
            <View style={{}}>
                <TextInput autoFocus onSubmitEditing={handleSearch} value={searchTearm} onChangeText={(text) => setsearchTearm(text)}
                    label={"Search"} style={{ backgroundColor: 'white' }} placeholder='Search here..' />
            </View>

            { setSearchResults.length>=1 &&
            <FlatList data={SearchResults}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Service',{
                            ServiceData:item
                        })
                    }}>
                        <View style={{flexDirection:'row',padding:5,alignItems:'center',backgroundColor:'white',margin:2,borderRadius:10}} >
                        <Image
                            source={{ uri: item.service_img }}
                            style={{ width: 60, height: 60, borderRadius: 10,borderWidth:1,borderColor:'lightgray',marginRight:10 }}
                        />
                        <Text style={{ color: 'black',fontSize:18 }} >{item.service_title}</Text>
                    </View>
                    </TouchableOpacity>
                )} />
                }
        </KeyboardAvoidingView>
    )
}

export default SearchTab

