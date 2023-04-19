import { FlatList, StyleSheet, Text, View, Linking, Pressable, RefreshControl, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BookingStatus, defaultAvatarImage } from '../Constants/Gconstants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { callApi, getBookingStatus } from '../Constants/Async_functions'
import { serverIP } from '../Constants/IPofBackned';
import ChildWithLink from '../Constants/ChildWithLink';
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import { ActionsForProvider } from '../Constants/ActionsForProvider';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Icon, Image, Skeleton } from '@rneui/base';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    backgroundColor: 'white'
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 1,
  },
  locationContainer: {
    margin: 4,
    alignSelf: 'flex-end'
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    marginLeft: 8,
  },
  bookingStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

  },
});



const BookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const commonUserData = useSelector(state => state.commonUserData)
  const navigation = useNavigation();
  console.log(commonUserData)
  useEffect(() => {
    loading &&

      callApi(serverIP + '/bookings', 'GET')
        .then((data) => {
          let bookingRequestsdata = data.data.map((value, index) => {
            return {
              ...value,
              locationForService: JSON.parse(value.locationForService),
            };
          });

          // Group the items based on created date
          let groupedBookingRequests = {};

          bookingRequestsdata.forEach((booking) => {
            const date = new Date(booking.createdAt).toDateString()

            if (!groupedBookingRequests[date]) {
              groupedBookingRequests[date] = [];
            }

            groupedBookingRequests[date].push(booking);
          });


          setBookingRequests(groupedBookingRequests);
          console.log(Object.entries(groupedBookingRequests).reverse())
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
  }, [loading]);

  const onRefresh = () => {
    setLoading(true);
  };
  
  
  if(loading) 
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <ScrollView style={{flex:1}}>
        <Skeleton width={'100%'} height={100} animation='wave' style={{margin:4}}/>
        <Skeleton width={'100%'} height={100} animation='wave' style={{margin:4}}/>
        <Skeleton width={'100%'} height={100} animation='wave' style={{margin:4}}/>
        <Skeleton width={'100%'} height={100} animation='wave' style={{margin:4}}/>
        <Skeleton width={'100%'} height={100} animation='wave' style={{margin:4}}/>
        <Skeleton width={'100%'} height={100} animation='wave' style={{margin:4}}/>
        <Skeleton width={'100%'} height={100} animation='wave' style={{margin:4}}/>
        <Skeleton width={'100%'} height={100} animation='wave' style={{margin:4}}/>
      </ScrollView>
    </View>
  )
  else
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={Object.entries(bookingRequests).reverse()}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        renderItem={({ item, index }) => {

          return (
            <View key={item[0]}>
              <Text style={styles.date}>{item[0]}</Text>
              {item[1].map((booking) => (
                <View style={styles.container} key={booking.id}>
                  <View style={styles.imageContainer}>
                    {
                      commonUserData.role != 'user' ?
                        <Image
                          PlaceholderContent={<Skeleton animation='wave' rounded size={23} />}
                          source={{ uri: booking.user_image && serverIP + booking.user_image || defaultAvatarImage }}
                          style={styles.image}
                        />
                        :
                        <Image
                          PlaceholderContent={<Skeleton animation='wave' rounded size={23} />}
                          source={{ uri: booking.serviceProviderImage && serverIP + booking.serviceProviderImage || defaultAvatarImage }}
                          style={styles.image}
                        />
                    }
                  </View>
                  <View style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      {
                        commonUserData.role != 'user' ?
                          <Text style={styles.name}>{booking.user_name}</Text>
                          :
                          <Text style={styles.name}>{booking.ServiceProvideName}</Text>
                      }

                      <View style={styles.locationContainer}>
                        <ChildWithLink
                          link={`https://maps.google.com/maps?q=${booking.locationForService.coords.latitude},${booking.locationForService.coords.longitude}`}
                        >
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgb(80,80,255)', borderRadius: 20, padding: 10, elevation: 6, backgroundColor: 'white' }} >
                            <Text style={{ color: 'rgb(80,80,255)', fontWeight: '800' }}>See Location</Text>
                            <Ionicons name='location-outline' size={17} color={'rgb(80,80,255)'} />
                          </View>
                        </ChildWithLink>
                      </View>
                    </View>

                    {booking.description_by_user && (
                      <Text style={styles.description}>{booking.description_by_user}</Text>
                    )}
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.serviceTitle}>For Date: {new Date(booking.booked_for_date).toDateString()}</Text>
                    </View>

                    <Text style={[styles.bookingStatus, { color: booking.status == BookingStatus.cancelledByUser || booking.status == BookingStatus.cancelledByServiceProvider ? 'red' : 'green' }]}>{getBookingStatus(booking.status)}</Text>
                    {
                      commonUserData.role != 'user' ?
                        <ActionsForProvider booking={booking} commonUserData={commonUserData} />
                        :
                        <View style={styles.buttonContainer}>
                          {
                            (booking.status != 4 && booking.status != BookingStatus.cancelledByServiceProvider) &&
                            <>
                              <Button title="Cancel" color="red" radius={20} raised icon={() => <Ionicons name='close-circle' color={'white'} size={25} />} disabled={booking.status == 4 || booking.status == 0 || booking.status == BookingStatus.cancelledByServiceProvider} onPress={() => {
                                Alert.alert("Cancel Request", 'Do you want to cancel this booking request', [
                                  {
                                    text: 'No',
                                    onPress: () => {
                                      console.log("Do nothing")
                                    },
                                    isPreferred: true
                                  },
                                  {
                                    text: 'Yes Cancel',
                                    onPress: () => callApi(serverIP + '/bookings/' + booking.id, 'PUT', { status: BookingStatus.cancelledByUser }).then(res => {
                                      console.log("res", res.data)
                                    }).catch(err => {
                                      console.log("err", err)
                                    }),

                                  }
                                ])


                              }} />
                              <Button radius={20} raised icon={() => (<Ionicons name='chatbox' style={{ marginHorizontal: 10 }} color={'white'} size={20} />)} title="Chat" onPress={() => {
                                navigation.navigate('PersonalChatScreen', { ChatTo: booking.ServiceProviderPhone })
                              }} />
                            </>


                          }

                        </View>
                    }

                  </View>
                </View>
              ))}
            </View>
          );
        }}
      />
    </View>
  );
};

const BookedRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const commonUserData = useSelector(state => state.commonUserData)
  const navigation = useNavigation();
  console.log(commonUserData)
  useEffect(() => {
    loading &&
      callApi(serverIP + '/bookings', 'GET')
        .then((data) => {
          let bookingRequestsdata = data.data.map((value, index) => {
            return {
              ...value,
              locationForService: JSON.parse(value.locationForService),
            };
          });

          // Group the items based on created date
          let groupedBookingRequests = {};

          bookingRequestsdata.forEach((booking) => {
            const date = new Date(booking.createdAt).toDateString()

            if (!groupedBookingRequests[date]) {
              groupedBookingRequests[date] = [];
            }

            if (booking.status == BookingStatus.acceptedByServiceProvider) {
              console.log("booking ", booking)
              groupedBookingRequests[date].push(booking);
            }
          });


          setBookingRequests(groupedBookingRequests);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
  }, [loading]);

  const onRefresh = () => {
    setLoading(true);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={Object.entries(bookingRequests)}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        renderItem={({ item, index }) => {
          if (!item[1].length) return null;
          else
            return (
              <View key={item[0]}>
                <Text style={styles.date}>{item[0]}</Text>
                {item[1].map((booking) => (
                  <View style={styles.container} key={booking.id}>
                    <View style={styles.imageContainer}>
                      {
                        commonUserData.role != 'user' ?
                          <Image
                            source={{ uri: booking.user_image && serverIP + booking.user_image || defaultAvatarImage }}
                            style={styles.image}
                          />
                          :
                          <Image
                            source={{ uri: booking.serviceProviderImage && serverIP + booking.serviceProviderImage || defaultAvatarImage }}
                            style={styles.image}
                          />
                      }
                    </View>
                    <View style={styles.infoContainer}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {
                          commonUserData.role != 'user' ?
                            <Text style={styles.name}>{booking.user_name}</Text>
                            :
                            <Text style={styles.name}>{booking.ServiceProvideName}</Text>
                        }


                      </View>

                      {booking.description_by_user && (
                        <Text style={styles.description}>{booking.description_by_user}</Text>
                      )}
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.serviceTitle}>For Date: {new Date(booking.booked_for_date).toDateString()}</Text>
                      </View>

                      <Text style={[styles.bookingStatus, { color: booking.status == BookingStatus.cancelledByUser || booking.status == BookingStatus.cancelledByServiceProvider ? 'red' : 'green' }]}>{getBookingStatus(booking.status)}</Text>
                      {
                        commonUserData.role != 'user' ?
                          <ActionsForProvider booking={booking} commonUserData={commonUserData} />
                          :
                          <View style={styles.buttonContainer}>
                            {
                              (booking.status != 4 && booking.status != BookingStatus.cancelledByServiceProvider) &&
                              <>
                                <Button title="Cancel" color="red" radius={20} raised icon={() => <Ionicons name='close-circle' color={'white'} size={25} />} disabled={booking.status == 4 || booking.status == 0 || booking.status == BookingStatus.cancelledByServiceProvider} onPress={() => {
                                  Alert.alert("Cancel Request", 'Do you want to cancel this booking request', [
                                    {
                                      text: 'No',
                                      onPress: () => {
                                        console.log("Do nothing")
                                      },
                                      isPreferred: true
                                    },
                                    {
                                      text: 'Yes Cancel',
                                      onPress: () => callApi(serverIP + '/bookings/' + booking.id, 'PUT', { status: BookingStatus.cancelledByUser }).then(res => {
                                        console.log("res", res.data)
                                      }).catch(err => {
                                        console.log("err", err)
                                      }),

                                    }
                                  ])


                                }} />
                                <Button radius={20} raised icon={() => (<Ionicons name='chatbox' style={{ marginHorizontal: 10 }} color={'white'} size={20} />)} title="Chat" onPress={() => {
                                  navigation.navigate('PersonalChatScreen', { ChatTo: booking.ServiceProviderPhone })
                                }} />
                              </>


                            }

                          </View>
                      }

                    </View>
                  </View>
                ))}
              </View>
            );
        }}
      />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function MyBookings() {
  const commonUserData = useSelector(state => state.commonUserData)

  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: commonUserData.role==="user"?'rgba(200,0,100,1)':'rgb(80,80,255)', }
      , lazy: true, tabBarActiveTintColor: 'white',tabBarIndicatorStyle:{backgroundColor:'orange'}
    
    }}>
      <Tab.Screen name="Booking Requests" component={BookingRequests} />
      <Tab.Screen name="Scheduled Bookings" component={BookedRequests} />
    </Tab.Navigator>
  );
}