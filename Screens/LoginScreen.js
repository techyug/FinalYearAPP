import { Button, KeyboardAvoidingView, Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 30,
        minWidth: 400,
        maxWidth: 1000,
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    AppNameContainer: {
        alignSelf: 'center',
        marginTop: -100,

        paddingBottom: 60

    },
    AppName: {

        fontSize: 40,
        fontWeight: '900',
        color: 'rgb(210,0,100)'


    },
    inputContainer: {
        width: '100%',
        alignSelf: 'center',
        padding: 10,

        justifyContent: 'center',
        alignItems: 'center',


    },
    input: {
        borderWidth: 2,
        borderColor: 'blue',
        marginBottom: 10,
        borderRadius: 10,
        width: 300,
        paddingLeft: 20,
        height: 40,
        backgroundColor: 'white',
        color: 'rgb(210,0,100)',
        fontWeight: "600",
        maxWidth: 300,

        elevation: 10

    },
    buttonContainer: {

        marginTop: 30,
        alignItems: 'center'
    },
    button: {

        borderRadius: 10,
        margin: 5,
        borderColor: 'blue',
        borderWidth: 1,
        backgroundColor: 'white',
        paddingVertical: 8,
        color: 'gray',
        paddingHorizontal: 50,

    },
    loginButton: {

        borderRadius: 10,
        margin: 5,
        paddingHorizontal: 60,
        backgroundColor: 'rgb(200,0,255)',
        color: 'white',
        paddingVertical: 10,
        elevation: 15

    },
    forgetButton: {
        alignSelf: 'flex-end',
        marginTop: -5,
        marginRight: 20,

    }
})
const LoginScreen = ({ navigation }) => {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('')
    // const window = Dimensions.get("window");
    // const screen = Dimensions.get("screen");
    // console.warn(window, screen)

    return (

        <KeyboardAvoidingView
            style={styles.container}

            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

        >
            <View style={styles.inputContainer}>
                <View style={styles.AppNameContainer} >
                    <Text style={styles.AppName} >NIYO</Text>
                </View>
                <TextInput
                    value={userEmail}
                    onChangeText={(userEmail) => setUserEmail(userEmail)}
                    placeholder='Email'
                    style={styles.input}

                />
                <TextInput

                    value={userPassword}
                    onChangeText={(userPassword) => setUserPassword(userPassword)}
                    placeholder='Password'
                    style={styles.input}
                    secureTextEntry


                />
                <Pressable
                    style={styles.forgetButton}
                    onPress={() => { navigation.navigate('ForgotPass') }} >
                    <Text style={{ color: 'blue' }} >Forgot Password?</Text>
                </Pressable>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {

                            navigation.replace('Home', {
                                userEmail: userEmail,
                                otherParam: 'anything you want here',
                            })

                        }}>
                        <Text style={styles.loginButton}  >Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.4} onPress={() => {
                        navigation.navigate('Register')
                    }}>
                        <Text style={styles.button} >Register</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>



    )
}

export default LoginScreen

