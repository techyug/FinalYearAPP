import { Button, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ForgotPassScreen = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 10,
        },

    })
    return (
        <KeyboardAvoidingView
            behavior='height'
            style={styles.container}
        >
            <View  >
                <Text>Reset pass</Text>
            </View>
        </KeyboardAvoidingView>

    )
}

export default ForgotPassScreen

