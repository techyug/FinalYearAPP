import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'


const SearchTab = () => {
    const styles = StyleSheet.create({})
    return (
        <KeyboardAvoidingView style={{ paddingTop: 50, paddingHorizontal: 20, flex: 1 }}>
            <View style={{}}>
                <TextInput


                    label={"Search"} style={{ borderWidth: 2, borderColor: 'blue', borderBottomWidth: 2, borderRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white' }} placeholder='Search here..' />
            </View>
            <ScrollView>
                <TouchableOpacity>
                    <Text>person 1</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SearchTab

