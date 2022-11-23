import { Button, KeyboardAvoidingView, Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'




const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',


    },
    container: {
        padding: 20,
        borderRadius: 30,
        minWidth: 400,
        maxWidth: 1000,
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

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('')
    const [error, setError] = useState(route.params ? route.params.message : "Login Please...")
    const [loading, setLoading] = useState(false)

    // const window = Dimensions.get("window");
    // const screen = Dimensions.get("screen");
    // // console.warn(window, screen)
    // const handleSignup = () => {
    //     firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(userEmail, userPassword).
    //         then(() => navigation.replace('Home'))
    //         .catch(error => setError(error.message))

    // };
    // const handleLogin = () => {
    //     firebase
    //         .auth()
    //         .signInWithWmailAndPassword(userEmail, userPassword)
    //         .then(user => navigation.replace('Home'))
    //         .catch(error => setError(error.message))
    // }


    return (
        <View style={styles.main}>
            <View style={styles.AppNameContainer} >
                <Text style={styles.AppName} >NIYO</Text>
            </View>
            <View style={{ color: 'red', alignSelf: 'center', padding: 10, backgroundColor: 'yellow', borderRadius: 10 }}>
                <Text>{error}</Text>
            </View>
            <KeyboardAvoidingView
                style={styles.container}

                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

            >


                <View style={styles.inputContainer}>
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
                        <Text style={{ color: 'rgb(26,120,241)', fontSize: 15, fontWeight: 'bold' }} >Forgot Password?</Text>
                    </Pressable>
                    <TouchableOpacity
                        style={{ marginVertical: 20 }}
                        activeOpacity={0.6}
                        // onPress={handleLogin}
                        onPress={() => {
                            setLoading(true);
                            setTimeout(() => {
                                if (userPassword === "ok") {
                                    setError("Logging in ...")
                                    setTimeout(() => navigation.replace('Home', {
                                        screen: 'Profile',
                                        params: { user: 'jane', userEmail: userEmail, },
                                        userEmail: userEmail,
                                    }), 200)
                                } else {
                                    setLoading(false);
                                    setError("Wrong Password...")
                                }

                            }, 400)

                            // navigation.replace('Home', {
                            //     screen: 'Profile',
                            //     params: { user: 'jane', userEmail: userEmail, },
                            //     userEmail: userEmail,
                            // });
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
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '900' }} >Login</Text>
                            </View>
                        )
                        }
                    </TouchableOpacity>
                </View>




            </KeyboardAvoidingView>

            <View style={{ marginTop: 50, alignSelf: 'center' }} >

                <Text>----- or continue with -------</Text>

            </View>

            <TouchableOpacity activeOpacity={0.4} onPress={() => { navigation.navigate('Register') }}
                style={{ alignSelf: 'center', flexDirection: 'row', margin: 10 }}>
                <Text >New User?</Text>
                <Text style={styles.signup} > Register here...</Text>
            </TouchableOpacity>


        </View>



    )
}

export default LoginScreen

