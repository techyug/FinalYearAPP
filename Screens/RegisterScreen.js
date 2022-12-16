import { KeyboardAvoidingView, Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '',

    },
    container: {

        borderRadius: 30,
        padding: 10,
    },
    AppNameContainer: {
        position: 'relative',
        top: 10,
        alignSelf: 'center',

        borderRadius: 50,

        backgroundColor: '#FF00BF',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',



    },
    AppName: {

        fontSize: 40,
        fontWeight: '900',
        color: 'white'


    },
    inputContainer: {
        width: '100%',
        alignSelf: 'center',


        paddingHorizontal: 10,
        paddingTop: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(200,238,242,1)',
        justifyContent: 'center',
        alignItems: 'center',


    },
    input: {
        marginBottom: 10,
        borderRadius: 10,
        width: 300,
        paddingHorizontal: 20,
        height: 50,
        backgroundColor: 'white',
        color: 'black',
        fontWeight: "600",
        maxWidth: 300,
        fontSize: 15,
        elevation: 5

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
        width: 200,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: 'rgb(246,106,104)',

        justifyContent: 'center',

        elevation: 4

    },
    forgetButton: {
        alignSelf: 'flex-end',
        marginTop: -5,
        marginRight: 20,
        fontSize: 30,

    },
    signup: {
        color: 'rgb(26,120,241)',
    }
})
const RegisterScreen = ({ navigation, params }) => {

    const [error, setError] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [conPassword, setconPassword] = useState('');
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    return (

        <View style={styles.main} >
            <View style={styles.AppNameContainer} >
                <Text style={styles.AppName} >HelpMeet</Text>
            </View>
            <KeyboardAvoidingView
            // style={styles.container}

            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

            >


                <View style={styles.inputContainer}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginBottom: 5 }}>
                        <Text style={{ color: error ? 'red' : 'black', fontSize: 25, fontWeight: 'bold', }}>{error ? error : "Register yourself"}</Text>

                    </View>
                    <TextInput
                        value={userName}
                        onChangeText={(userName) => setUserName(userName)}
                        placeholder='Your Name'
                        style={styles.input}

                    />
                    <TextInput
                        value={userPhone}
                        onChangeText={(userPhone) => setUserPhone(userPhone)}
                        placeholder='Phone'
                        style={styles.input}

                    />
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
                    <TextInput
                        value={conPassword}
                        onChangeText={(pass2) => setconPassword(pass2)}
                        placeholder='Confirm Password'
                        style={styles.input}

                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={{ marginVertical: 20 }}
                        activeOpacity={0.6}
                        // onPress={handleLogin}
                        onPress={() => {

                            setLoading(true);
                            setTimeout(() => {
                                if (conPassword === userPassword) {
                                    axios.post("http://192.168.1.8:3000/user", {
                                        user_name: userName,
                                        user_email: userEmail,
                                        user_phone: userPhone,
                                        user_pass: userPassword

                                    }).then((res) => {
                                        console.warn(res)
                                    }).catch((err) => {
                                        console.warn(err)
                                    })
                                    setError("Account Created....")
                                    setTimeout(() => navigation.navigate('Login', { message: 'Account Created, Login Now' }), 200)
                                } else {
                                    setLoading(false);
                                    setError("Password Mismatch")
                                }

                            }, 400)



                            // navigation.replace('Home', {
                            //     userEmail: userEmail,
                            //     userPass: userPassword,
                            //     otherParam: 'anything you want here',
                            // })

                        }}
                    >
                        {loading ? (
                            <ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                visible={loading}
                                color={'white'}
                                size="large"
                                style={{ width: 200, backgroundColor: 'rgb(246,180,100)', padding: 12, borderRadius: 10 }}
                                //Text with the Spinner
                                textContent={'Loading...'}
                                //Text style of the Spinner Text
                                textStyle={styles.spinnerTextStyle}
                            />
                        ) : (
                            <View style={styles.loginButton}>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '900' }} >Sign up</Text>
                            </View>
                        )
                        }
                    </TouchableOpacity>
                </View>




            </ KeyboardAvoidingView>
            <View style={{ marginTop: 50, padding: 5, alignSelf: 'center' }}>
                <Text>----------- or continue with -----------</Text>
                <View>

                </View>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                navigation.navigate('Login')
            }}
                style={{ flexDirection: 'row', alignSelf: 'center', }}
            >
                <Text style={{}}>Already Registered?</Text>
                <Text style={{ color: 'blue' }} > Sign In Here...</Text>
            </TouchableOpacity>
        </View >

    )
}

export default RegisterScreen

