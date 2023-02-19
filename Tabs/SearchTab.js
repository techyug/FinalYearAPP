import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'


const Person = () => {
    return (
        <View>

            <Text>Yogendra singh</Text>
        </View>
    )
}
const SearchTab = () => {

    const styles = StyleSheet.create({})
    return (
        <KeyboardAvoidingView style={{ paddingTop: 50, paddingHorizontal: 20, flex: 1 }}>
            <View style={{}}>
                <TextInput autoFocus
                    label={"Search"} style={{ backgroundColor: 'white' }} placeholder='Search here..' />
            </View>
            <ScrollView>
                <TouchableOpacity>
                    <Person />
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SearchTab

