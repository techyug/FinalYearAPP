import { StyleSheet, Button, Text, View } from 'react-native'
import React from 'react'

const Proflletab = ({ navigation }) => {
    const styles = StyleSheet.create({})
    return (
        <View>
            <Text>Proflletab</Text>
            <Button title='Logout' onPress={() => navigation.replace('Login')} />
            <Text>Proflletab</Text>
            <Button title='Logout' onPress={() => navigation.replace('Login')} />
            <Text>Proflletab</Text>
            <Button title='Logout' onPress={() => navigation.replace('Login')} />
        </View>
    )
}

export default Proflletab

