import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from '../Tabs/Feed';
import SearchTab from '../Tabs/SearchTab';
import Proflletab from '../Tabs/Proflletab';
import { useNavigation } from '@react-navigation/native';


const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen({ navigation, route }) {
    // navigation.navigate('Login');
    // console.warn(route.params);
    const screenProps = route.params;
    


    return (

        <Tab.Navigator activeColor="rgb(255,255,255)"
            inactiveColor="rgba(80,0,0,1)"

            barStyle={{ backgroundColor: 'rgb(210,0,100)', height: 50, }}
        >
            <Tab.Screen options={{ tabBarIcon: 'home', title: 'Home' }} initialParams={screenProps} name="Feed" component={Feed} />
            <Tab.Screen options={{ tabBarIcon: 'cloud-search' }} name="Search" component={SearchTab} />
            <Tab.Screen options={{ tabBarIcon: 'account', title: 'Profile' }} name="Profile" component={Proflletab} />
        </Tab.Navigator >

    );
}
