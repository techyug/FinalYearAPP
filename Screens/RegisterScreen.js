import { KeyboardAvoidingView, Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { serverIP } from '../Constants/IPofBackned'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { updateInfo } from '../Redux/actions'

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 10,
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
        elevation: 8,
        borderColor: 'white',
        borderWidth: 2,
        margin: 10,
        paddingHorizontal: 10,
        paddingTop: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(200,238,242,1)',
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
    const dispatch = useDispatch();

    const [error, setError] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [conPassword, setconPassword] = useState('');
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [isProvider, setIsProvider] = useState(false)
    const usernameref = useRef()
    const phoneref = useRef();
    const passref = useRef();
    const conPassref = useRef();
    const emailref = useRef();

    const isValidForm = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(userEmail) === false) {
            dispatch(updateInfo({ msg: "Email seems to be invalid", show: true, infoType: "Error" }));
            return false;
        }
        if (userPhone.length < 10 || userPhone.length > 10) {
            dispatch(updateInfo({ msg: "Invalid Phone, enter again...", show: true, infoType: "Error" }));
            phoneref.current.focus();
            return false;
        } 
        if (userName.length < 3) {
            dispatch(updateInfo({ msg: "Name Too short", show: true, infoType: "Error" }));
            return false;
        }
        if(userPassword.length<5){
            dispatch(updateInfo({ msg: "Password should contain more than 5 charecters", show: true, infoType: "Error" }));
            return false;
        }
        if(conPassword!==userPassword ){
            dispatch(updateInfo({ msg: "Password Does Not match", show: true, infoType: "Error" }));
            return false;
        }
        return true
    }
    const handleRegisterUser = () => {
        setLoading(true);
        if(!isValidForm()){
            setLoading(false)
            return
           
        }

        if (conPassword === userPassword) {
            axios.post(serverIP + "/users", {
                user_name: userName,
                user_email: userEmail,
                user_phone: userPhone,
                user_pass: userPassword

            }).then((res) => {
               
                let re = res.data.toString();
                if (re.includes("Duplicate")) {
                    dispatch(updateInfo({ msg: re, show: true, infoType: "Error" }));
                    setLoading(false);
                    setError(res.data)
                } 
                if(res.data.affectedRows==1) {
                    dispatch(updateInfo({ msg: "Account created...", show: true, infoType: "Success" }));
                    setLoading(false);
                    navigation.navigate('Login', { message: 'Account Created, Login Now' })
                }
            }).catch((err) => {
                setLoading(false);
                setError(err.toString())
                console.log("error :", err)
            })

        } else {
            
            setLoading(false);
            setError("Password Mismatch")
        }
    }
    const handleRegisterProvider = () => {
       
        setLoading(true);
        if(!isValidForm()){
            setLoading(false)
            return
        }
        if (conPassword === userPassword) {
            axios.post(serverIP + "/service-provider", {
                ServiceProvideName: userName,
                ServiceProviderEmail: userEmail,
                ServiceProviderPhone: userPhone,
                ServiceProviderPassword: userPassword

            }).then((res) => {
                let re = res.data.toString();
                console.log(re)
                if (re.includes("Duplicate")) {
                    dispatch(updateInfo({ msg: re, show: true, infoType: "Error" }));
                    setLoading(false);
                    setError(res.data)
                } 
                if(res.data.affectedRows==1) {
                    dispatch(updateInfo({ msg: "Account created...", show: true, infoType: "Success" }));
                    setLoading(false);
                    navigation.navigate('Login', { message: 'Account Created, Login Now' })
                }
                else{
                    dispatch(updateInfo({ msg: re, show: true, infoType: "Error" }));
                    setLoading(false);
                    setError(res.data)
                }
            }).catch((err) => {
                dispatch(updateInfo({ msg: err.toString(), show: true, infoType: "Error" }));
                setLoading(false);
            })

        } else {
            setLoading(false);
            setError("Password Mismatch")
        }
    }

    return (
        <ScrollView style={styles.main} >
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

                <View style={styles.inputContainer}>
                    <TextInput
                        value={userName}
                        onChangeText={(userName) => setUserName(userName)}
                        placeholder='Your Name'
                        ref={usernameref}
                        style={styles.input}
                    />

                    <TextInput
                        value={userPhone}
                        maxLength={10}
                        onChangeText={(userPhone) => setUserPhone(userPhone)}
                        placeholder='Phone'
                        ref={phoneref}
                        style={styles.input}
                    />
                    <TextInput
                        value={userEmail}
                        ref={emailref}
                        onChangeText={(userEmail) => setUserEmail(userEmail)}
                        placeholder='Email'
                        style={styles.input}
                    />

                    <TextInput
                        value={userPassword}
                        ref={passref}
                        onChangeText={(userPassword) => setUserPassword(userPassword)}
                        placeholder='Password'
                        style={styles.input}

                        secureTextEntry
                    />

                    <TextInput
                        value={conPassword}
                        ref={conPassref}
                        onChangeText={(pass2) => setconPassword(pass2)}
                        placeholder='Confirm Password'
                        style={styles.input}

                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={{ marginVertical: 20 }}
                        activeOpacity={0.6}
                        // onPress={handleLogin}
                        onPress={!isProvider ? handleRegisterUser : handleRegisterProvider}
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
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '900' }} >
                                    {
                                        isProvider ? "Provider Signup" : "Signup"
                                    }
                                </Text>
                            </View>
                        )
                        }
                    </TouchableOpacity>
                </View>
                {/* <View style={{ marginTop: 10, padding: 5, alignSelf: 'center' }}>
                    <Text>----------- or continue with -----------</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Ionicons name='logo-google' size={30} />
                        <Ionicons name='logo-facebook' size={30} />
                    </View>
                </View> */}
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    navigation.navigate('Login')
                }}
                    style={{ flexDirection: 'row', alignSelf: 'center', }}
                >
                    <Text style={{}}>Already Registered?</Text>
                    <Text style={{ color: 'blue' }} > Sign In Here...</Text>
                </TouchableOpacity>

            </View >
        </ScrollView>
    )
}

export default RegisterScreen

