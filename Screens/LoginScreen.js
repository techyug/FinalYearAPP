import { Button, KeyboardAvoidingView, Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { serverIP } from '../Constants/IPofBackned'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { updateInfo, userLogin } from '../Redux/actions'
import SplashScreen from './SplashScreen'

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    container: {
        padding: 20,
        borderRadius: 30,

        alignItems: 'center',

    },
    AppNameContainer: {
        alignSelf: 'center',
        paddingBottom: 10

    },
    AppName: {

        fontSize: 40,
        fontWeight: '900',
        color: 'rgb(210,0,100)'


    },
    inputContainer: {
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingTop: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(200,238,242,1)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        borderColor: 'white',
        borderWidth: 2
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
        height: 50,
        alignItems: 'center',
        backgroundColor: 'rgb(246,106,104)',
        justifyContent: 'center',
        elevation: 15
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
const LoginScreen = ({ navigation, route }) => {
    const [clickLogin,setclickLogin] = useState(false)
    const [showSplash,setshowSplash] = useState(true)
    const dispatch = useDispatch();
    const userData = useSelector(s => s.userData)
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('')
    const [error, setError] = useState(route.params ? route.params.message : "Login Please...")
    const [loaded, setLoaded] = useState(true)
    const phoneref = useRef()
    const passref = useRef()
    const storeData = (data) => {
        try {
            AsyncStorage.setItem('@userData', JSON.stringify(data))
        } catch (e) {
            // saving error
        }
    }
    const LoginFromStorageData = async () => {
        let value = await AsyncStorage.getItem('@userData')

        if (value) {
            setshowSplash(true)
            let  userData = JSON.parse(value);
            console.log(userData)
            switch (userData.role) {
                case "user":
                    console.log("user")
                    setUserPhone(userData.user_phone)
                    setUserPassword(userData.user_pass)
                    setclickLogin(true)

                case 'Service Provider':
                    console.log("provider")
                    setUserPhone(userData.ServiceProviderPhone)
                    setUserPassword(userData.ServiceProviderPassword)
                    setclickLogin(true)
                    
            }

            // dispatch(userLogin(userData));
            // navigation.replace('Home')


        }
        else 
        setshowSplash(false)


    }
    
    useEffect(() => {
        
        if(!clickLogin)
            LoginFromStorageData().finally(d=>console.log(d))
        if(clickLogin){
            loginHandler()
        }
    }, [clickLogin]);

    function validateInpute () {
        if ( userPhone!=undefined && (userPhone.length < 10 || userPhone.length > 10)) {
            phoneref.current.focus()
            return false;
        } 
        if ( userPassword!=undefined && userPassword.length < 4) {
            passref.current.focus()
            return false;
        }
        return true;
    }
    const loginHandler = () => {
        setLoaded(false)
        console.log("loginhandler")
        if(!userPhone || !userPassword){
            setLoaded(true)
            return
        }
        axios.post(serverIP + '/login', { user_phone: userPhone, user_pass: userPassword })
            .then(res => {
                if (res.data.msg === 'Login Success') {
                    storeData(res.data);
                    delete res.data.ServiceProviderPassword;
                    delete res.data.user_pass
                    
                    dispatch(userLogin(res.data))
                    setLoaded(true)
                    setshowSplash(false)
                    navigation.replace('Home')
                }
                else {
                    setError(res.data.msg)
                    setLoaded(true)
                    dispatch(updateInfo({ msg: res.data.msg, show: true, infoType: "Error" }));
                    setshowSplash(false)

                }
            }).catch(err => {
                console.log("login err",err)
                setLoaded(true)
                setshowSplash(false)
                dispatch(updateInfo({ msg: err.toString(), show: true, infoType: "Error" }));
            })


    }

    if(showSplash){
        return <SplashScreen/>
    }
    return (
        <View style={styles.main}>
            <StatusBar barStyle={'default'} backgroundColor={'rgb(80,80,255)'} />
            <ScrollView style={{ alignSelf: 'auto', marginTop: 30 }}>
                <View style={styles.AppNameContainer} >
                    <Text style={styles.AppName} >HelpMeet</Text>
                </View>
                <View style={{ color: 'red', alignSelf: 'center', padding: 10, backgroundColor: 'yellow', borderRadius: 10 }}>
                    <Text>{error}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={userPhone}
                        onChangeText={(userPhone) => setUserPhone(userPhone)}
                        placeholder='Phone Number'
                        style={styles.input}
                        keyboardType='number-pad'
                        cursorColor={'black'}
                        ref={phoneref}
                        onSubmitEditing={() => passref.current.focus()}
                    />
                    <TextInput
                        value={userPassword}
                        onChangeText={(userPassword) => setUserPassword(userPassword)}
                        placeholder='Password'
                        style={styles.input}
                        cursorColor={'black'}
                        ref={passref}
                        onSubmitEditing={loginHandler}
                        secureTextEntry
                    />
                    <Pressable
                        style={styles.forgetButton}
                        onPress={() => { navigation.navigate('ForgotPass') }} >
                        <Text style={{ color: 'rgb(26,120,241)', fontSize: 15, fontWeight: 'bold' }} >Forgot Password?</Text>
                    </Pressable>
                    <TouchableOpacity
                        style={{ marginVertical: 20 }}
                        activeOpacity={0.6}
                        // onPress={handleLogin}
                        onPress={loginHandler}
                    >
                        {!loaded ? (
                            <ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                visible={loaded}
                                color={'white'}
                                size="large"
                                style={{ width: 200, backgroundColor: 'rgb(246,180,100)', padding: 12, borderRadius: 10 }}
                                textContent={'Loading...'}
                                textStyle={styles.spinnerTextStyle}
                            />
                        ) : (
                            <View style={styles.loginButton}>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '900' }} >Login</Text>
                            </View>
                        )
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 50, alignSelf: 'center' }} >
                    <Text>----- or continue with -------</Text>
                </View>

                <TouchableOpacity activeOpacity={0.4} onPress={() => { navigation.navigate('Register') }}
                    style={{ alignSelf: 'center', flexDirection: 'row', margin: 10 }}>
                    <Text >New User?</Text>
                    <Text style={styles.signup} > Register here...</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}

export default LoginScreen

