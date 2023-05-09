import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react'

const ForgotPassScreen = () => {

    const [enteredGoalText,setEnteredGoalText] = useState('');
   
    function goalInputHandler(enteredText){
    setEnteredGoalText(enteredText);
    }
    function addGoalHandler(){
    console.log(enteredGoalText)
    //enteredGoalText is the value entered in textinput
    }
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


                <TextInput placeholder="enter your phone" style={{padding:26,fontSize:23,borderWidth:4,borderColor:'gray',borderRadius:16}} onChangeText={goalInputHandler}></TextInput>
                 <Button title="Get an OTP" onPress={addGoalHandler}></Button>
                {/* <Text>Reset pass</Text> */}
            </View>
        </KeyboardAvoidingView>

    )
}

export default ForgotPassScreen

