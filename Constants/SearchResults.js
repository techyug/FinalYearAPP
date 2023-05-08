import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { callApi } from './Async_functions'
import { serverIP } from './IPofBackned'

const styles = StyleSheet.create({})
export const SearchResults= (props)=> {
    const [searchRes,setSeachRes] = useState([]);
    
    callApi(serverIP+'/search-service/'+props.searchingFor,'GET').then(res=>{
        console.log(res.data)
        setSeachRes(res.data)
    }).catch(err=>{
        console.log("err",err)
    })
  return (
    <View>
      {
        searchRes.map((item,index)=>{
            return (
                <Text>Hello</Text>
            )
        })
      }
    </View>
  )
}
