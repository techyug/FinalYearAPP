import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { BookingStatus } from './Gconstants';
import { serverIP } from './IPofBackned';

export const showLocalNotification = (title = "Your Title will appear here", body = "Notification body should be here...", NotificationData = { "data": { "name": "ABC" } }) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: NotificationData,
      subtitle: 'Experimental Notifications',
      color: 'red',
      sticky: false,
      autoDismiss: true,
      badge: true,



    },
    trigger: null,

  }).then(r => console.log("Notification  : ", r));
}

export const callApi = async (url = serverIP, method = 'GET', data = {}) => {
  console.log("Calling api " + method, url, data)

  let value = await AsyncStorage.getItem('@userData')
  if (value !== null) {
    const userData = JSON.parse(value);
    let token = userData.token
    let headers = {'tokenHeader': `${token}`}
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data'
    }
    switch (method) {
      case "POST":
        return await axios.post(url, data, { headers: headers })
      case "GET":
        return await axios.get(url, { headers: headers })
      case 'PUT':
        return await axios.put(url,data,{ headers: headers })
    }
  }
}


export const getISTLocal = () => {
  const date = new Date();
  var ISToffSet = 0; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
  offset = ISToffSet * 60 * 1000;
  return new Date(date.getTime() + offset);
  
}
const bookingStatuses = [
  "Deleted",
  "New Booking Request",
  "Accepted by service provider",
  "Cancelled by service provider",
  "Cancelled by user",
];

export const getBookingStatus = (statusId) => {
  if (statusId >= 0 && statusId < bookingStatuses.length) {
    return bookingStatuses[statusId];
  } else {
    return "Unknown status";
  }
};
