import { KeyboardAvoidingView, Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { serverIP } from '../Constants/IPofBackned'

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
        paddingHorizontal: 20

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
        margin: 10,
        backgroundColor: '#FF00BF',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',



    },
    AppName: {

        fontSize: 40,
        fontWeight: '900',
        color: 'white',


    },
    inputContainer: {
        width: '100%',
        alignSelf: 'center',

        margin: 10,
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
        backgroundColor: '#FF00BF',

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
    const [isProvider, setIsProvider] = useState(false)

    const countries = [
        "india", "nepal", "bhutan"
    ]
    useEffect(() => {


    }, [])
    console.log(isProvider)
    return (
<KeyboardAvoidingView style={styles.main} behavior='position'>


        <View >
            <View style={styles.AppNameContainer} >
                <Text style={styles.AppName} >HelpMeet</Text>
            </View>


            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'rgba(200,238,242,1)', justifyContent: 'space-evenly', padding: 10, marginVertical: 10, borderRadius: 20 }}>
                <TouchableOpacity onPress={() => setIsProvider(false)}>
                    <View style={{ padding: 10, borderRadius: 10, backgroundColor: !isProvider ? '#0e5beb' : 'rgba(255,255,255,0.7)', paddingHorizontal: 20 }} >
                        <Text style={{ color: isProvider ? 'rgb(0,0,0)' : 'white' }}>Normal user</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsProvider(true)}>
                    <View style={{ padding: 10, borderRadius: 10, backgroundColor: !isProvider ? 'rgba(255,255,255,0.7)' : '#0e5beb', paddingHorizontal: 20 }}>
                        <Text style={{ color: isProvider ? 'white' : 'rgb(0,0,0)' }}>Service Provider </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {
                !isProvider &&
                <View style={styles.inputContainer}>
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
                                    axios.post(serverIP+"/user", {
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
            }
            {
                isProvider &&
                <View style={styles.inputContainer}>
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
                                    axios.post(serverIP+"/service-provider", {
                                        ServiceProvideName: userName,
                                        ServiceProviderEmail: userEmail,
                                        ServiceProviderPhone: userPhone,
                                        ServiceProviderPassword: userPassword

                                    }).then((res) => {
                                        console.warn("Service Provider Crearted")
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
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '900' }} >Sign up as Provider</Text>
                            </View>
                        )
                        }
                    </TouchableOpacity>
                </View>
            }


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
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

