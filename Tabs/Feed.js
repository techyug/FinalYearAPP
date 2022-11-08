import { StyleSheet, FlatList, TouchableOpacity, Image, Text, View } from 'react-native'

import React from 'react'
const CategoriesData = [
    {
        id: "1",
        catname: "Cook",
        catIconURL: "https://img.freepik.com/premium-vector/chef-cooking-food-flat-style-illustration-icon_178650-3566.jpg"
    },
    {
        id: "2",
        catname: "Teacher",
        catIconURL: "https://cdn-icons-png.flaticon.com/512/906/906175.png"
    },
    {
        id: "3",
        catname: "Doctor",
        catIconURL: "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"
    },
    {
        id: "4",
        catname: "Sweeper",
        catIconURL: "https://img.freepik.com/premium-vector/chef-cooking-food-flat-style-illustration-icon_178650-3566.jpg"
    },
    {
        id: "5",
        catname: "Gaurd",
        catIconURL: "https://img.freepik.com/premium-vector/chef-cooking-food-flat-style-illustration-icon_178650-3566.jpg"
    },
    {
        id: "6",
        catname: "Gaurd",
        catIconURL: "https://img.freepik.com/premium-vector/chef-cooking-food-flat-style-illustration-icon_178650-3566.jpg"
    },
];


const styles = StyleSheet.create({
    feedScreen: {
        paddingTop: 40,
        paddingHorizontal: 20
    }
    ,
    AppName: {
        fontSize: 40,
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
    CatHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(255,0,100)',
        alignSelf: 'flex-start',
        marginLeft: 5,


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

    }

});

const Feed = () => {

    return (
        <View style={styles.feedScreen} >
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 10 }}>
                <Text style={styles.AppName}>NIYO</Text>
                <View style={{ borderWidth: 0, width: '70%', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                    {/* <SearchBar
                    inputContainerStyle={{ borderColor: 'rgb(210,0,110)', borderWidth: 2, alignSelf: 'center', borderRadius: 20, borderBottomWidth: 2, }}

                    inputStyle={{ backgroundColor: 'white', borderRadius: 10, marginLeft: -5, paddingLeft: 10 }}
                    containerStyle={{
                        borderRadius: 10,
                        backgroundColor: "white",
                        padding: 0,

                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        minWidth: 200,

                        width: 200,
                        maxWidth: 400

                    }}
                    rightIcon
                    placeholder="Search Here..."
                    lightTheme
                    round
                /> */}
                </View>



            </View>
            <CategoryScreen />
        </View>
    )
}

function CategoryScreen() {
    return (
        <View style={styles.categoryStyle} >
            <FlatList
                data={CategoriesData}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ backgroundColor: 'rgba(240,0,0,0.05)', borderRadius: 10, flexDirection: 'row', padding: 5, }}
                renderItem={(item) => {

                    return (
                        <TouchableOpacity
                            activeOpacity={0.5}

                            onPress={() => { alert('Clicked on ' + item.item.catname) }}
                            style={styles.CatFlex}>
                            <Image
                                source={{ uri: item.item.catIconURL }}
                                style={{ width: 60, height: 60, borderRadius: 10 }}
                            />
                            <Text style={{ fontWeight: 'bold' }} >{item.item.catname}</Text>
                        </TouchableOpacity>


                    );
                }}
                keyExtractor={(cat) => { return cat.id; }}
            />


        </View>);
}




export default Feed

