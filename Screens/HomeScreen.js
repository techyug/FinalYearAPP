import { Button, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


function FeedScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>FeedScreen!</Text>
        </View>
    );
}

function SearchScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>SearchsScreen</Text>
        </View>
    );
}

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={FeedScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
