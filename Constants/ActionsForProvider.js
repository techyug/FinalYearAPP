import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { callApi } from './Async_functions'
import { serverIP } from './IPofBackned'
import { BookingStatus } from './Gconstants'
import { Button } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ChildWithLink from './ChildWithLink'

const styles = StyleSheet.create({})

export const ActionsForProvider = (props) => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
      {
        props.booking.status == 1 &&
        <>

          <Button title='Accept' radius={20} icon={<Ionicons name='checkmark' color={'white'} size={20} />} color={'primary'} onPress={() => {
            Alert.alert('Accepting request',
              "Do you want to accept booking request", [
              {
                text: 'NO',

              },
              {
                text: "Yes",
                isPreferred: true,
                onPress: () => callApi(serverIP + '/bookings/' + props.booking.id, 'PUT', { status: BookingStatus.acceptedByServiceProvider }).then(res => {
                  Alert.alert('Accepted successfully', "Service request accepted")
                }).catch(err => {
                  console.log(err)
                  Alert.alert('Failed to Accept')
                })
              }
            ])
          }} />
          <Button title='Deny' radius={20} color={'warning'} icon={<Ionicons name='close' color={'white'} size={20} />} onPress={() => {
            callApi(serverIP + '/bookings/' + props.booking.id, 'PUT', { status: BookingStatus.cancelledByServiceProvider }).then(res => {
              Alert.alert('Service Cancelled Successfully')
            }).catch(err => {
              console.log(err)
              Alert.alert('Failed to Deny service')
            })
          }} />
        </>


      }
      {
        props.booking.status == BookingStatus.acceptedByServiceProvider &&
        <>
          <Button radius={20} raised icon={() => (<Ionicons name='chatbox' style={{ marginHorizontal: 10 }} color={'white'} size={20} />)} title="Chat" onPress={() => {
            navigation.navigate('PersonalChatScreen', { ChatTo: props.booking.user_phone })
          }} />
          <View style={styles.locationContainer}>
            
            <ChildWithLink
              link={`https://maps.google.com/maps?q=${props.booking.locationForService.coords.latitude},${props.booking.locationForService.coords.longitude}`}
            >
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderWidth:1,borderColor:'rgb(80,80,255)',borderRadius:20,padding:10,elevation:6,backgroundColor:'white'}} >
                <Text style={{color:'rgb(80,80,255)',fontWeight:'800'}}>See Location</Text>
                <Ionicons name='location-outline' size={17} color={'rgb(80,80,255)'} />
              </View>
            </ChildWithLink>
          </View>
        </>

      }
    </View>
  )
}
