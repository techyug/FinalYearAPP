import { StyleSheet, Button, Text, View, } from 'react-native'
import React from 'react'
import * as Battery from 'expo-battery'

import { useState } from 'react'
const Proflletab = ({ navigation, route }) => {
    console.warn(this)

    const [battery, setBattery] = useState(0);
    var b;
    async () => {
        const batteryLevel = await Battery.getBatteryLevelAsync();
        console.warn(batteryLevel)
    }

    const styles = StyleSheet.create({
        profileTab: {
            flex: 1,
            alignItems: "center",
            padding: 30,
            paddingTop: 40
        }
    })
    return (
        <View style={styles.profileTab}>
            <View style={styles.userName} >
                <Text>{route.params.userEmail ? route.params.userEmail : 'No params'}</Text>
            </View>


            <Button color={'red'} title='Logout' onPress={() => navigation.replace('Login')} />

        </View>
    )
}

export default Proflletab

