import * as Notifications from 'expo-notifications';

export const showLocalNotification = (title="Your Title will appear here",body="Notification body should be here...",NotificationData={"data":{"name":"ABC"}})=>{
    Notifications.scheduleNotificationAsync({
        content: {
          title:  title,
          body: body,
          data: NotificationData,
          subtitle:'Experimental Notifications',
          color:'red',
          sticky:false,
          autoDismiss:true,
          badge:true,

        },
        trigger:null,
      
      }).then(r=>console.log("Notification  : ",r));
}