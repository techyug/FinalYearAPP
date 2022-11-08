import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from '../Tabs/Feed';
import SearchTab from '../Tabs/SearchTab';
import Proflletab from '../Tabs/Proflletab';



// function FeedScreen() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>FeedScreen!</Text>
//         </View>
//     );
// }

// function SearchScreen() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>SearchsScreen</Text>

//         </View>
//     );
// }
// function ProfileTab({ navigation }) {

//     return (
//         <ScrollView contentContainerStyle={{
//             flex: 1, paddingTop: 40, alignItems: 'stretch', paddingHorizontal: 20
//         }} >
//             <View  >
//                 <Text>Hello Brother</Text>
//                 <Button title='Logout' onPress={() => navigation.replace('Login')} />

//             </View>

//         </ScrollView>
//     );
// }

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen({ navigation }) {
    // navigation.navigate('Login');
    // console.warn(navigation);
    return (

        <Tab.Navigator activeColor="rgb(255,255,255)"
            inactiveColor="rgba(10,10,10,0.5)"

            barStyle={{ backgroundColor: 'rgb(100,100,100)', height: 50 }} >
            <Tab.Screen options={{ tabBarIcon: 'home', title: 'Home' }} name="Feed" component={Feed} />
            <Tab.Screen options={{ tabBarIcon: 'cloud-search' }} name="Search" component={SearchTab} />
            <Tab.Screen options={{ tabBarIcon: 'account', title: 'Profile' }} name="Profile" component={Proflletab} />
        </Tab.Navigator>

    );
}
