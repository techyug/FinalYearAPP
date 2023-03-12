
import { Button, Text, View,AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ForgotPassScreen from './Screens/ForgotPassScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ServiceScreen from './Screens/ServiceScreen'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './Redux/store';
import { Ionicons } from '@expo/vector-icons';
import { updateInfo } from './Redux/actions';
import ServiceProviderShowcase from './Screens/ServiceProviderShowcase';
import AddServiceFormScreen from './Screens/AddServiceFormScreen';
import * as Notifications from 'expo-notifications';



import { useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import ProviderProfileScreen from './Screens/ProviderProfileScreen';
import ServiceofProviderScreen from './Screens/ServiceofProviderScreen';
import { connectToSocket } from './Constants/GlobalSocket';
const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      enableLights:true
    });
  }

  if (Device.isDevice) {
    console.log(Device.brand,Device.designName,Device.designName,Device.deviceYearClass,"Version",Device.osVersion,Device.osName)
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  
  });
}

// TaskManager.defineTask('socketTask', ({ data, error }) => {
//   if (error) {
//     console.log('Task encountered an error:', error);
//     return;
//   }
//   if (data) {
//     console.log('Task data:', data);
//   }
//   console.log('Task is running!');
//   // Start socket connection here and keep it alive
//   // You can use a loop with a delay to keep the connection alive
// });

// BackgroundTask.define(() => {
//   // Start socket connection here and keep it alive
//   // You can use a loop with a delay to keep the connection alive
// setInterval(()=>{
//   console.log(AppState.currentState)
// },2000)
// });
registerForPushNotificationsAsync().then(token => console.log("push token in app .js",token));
function App() {
  var socket = connectToSocket();
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  // const handleAppStateChange = (appState) => {
  //   console.log(appState)
  //   if (appState === 'background') {
  //    // BackgroundTask.schedule();
  //   }
  // };
  
  useEffect(()=>{
   
    // AppState.addEventListener('change', handleAppStateChange);
   
    

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("You Clicked on Notification",response);
    });

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   // setNotification(notification);
    //   console.log("Anotikfdncf")
    // });
    return () => {
socket.disconnect()
    //   // AppState.removeEventListener('change', handleAppStateChange);
      //Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[])
  // const handleAppStateChange = (appState) => {
  //   console.log("Inside handleappstatechange")
  //   if (appState === 'background') {
  //     TaskManager.isTaskRegisteredAsync('socketTask').then(async(registered) => {
  //       if (registered === false) {
  //         TaskManager.
  //         console.log( TaskManager.getRegisteredTasksAsync())
  //          //TaskManager.registerTaskAsync('socketTask');
  //          //TaskManager.registerTaskAsyn('taskname')
  //       }
  //     });
  //   }
  // };

  const CustomNavigationConatiner = () => {
    const info = useSelector(state => state.info)
    const dispatch = useDispatch()
    const msg = info.msg || " No "
    if(info.show){
      setTimeout(() => {
        let data = {
          msg: "No new MSG",
          show: false,
        }
        dispatch(updateInfo(data))
      }, 5000);
    }
    return (
      <NavigationContainer>
        <View style={{ display: info.show ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,paddingVertical:10, backgroundColor: info.infoType=="Success"?'green':'rgb(200,0,0)' }}>
          <Text style={{ color: info.infoType=="Success"?'white':'white' }} >{msg}</Text>
          <Ionicons name='close' size={20} color={'white'} onPress={() => {
            const data = { msg: "",  show: false}
            dispatch(updateInfo(data))
          }} />
        
        </View>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ title: 'Reset Password'}} name="ForgotPass" component={ForgotPassScreen} />
          <Stack.Screen name='Register' options={{ headerShown: false, title: 'Regiter ',animation:'fade' }} component={RegisterScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false, }} component={HomeScreen} />
          <Stack.Screen name='Service' component={ServiceScreen} />
          <Stack.Screen name='ProviderShowCase' component={ServiceProviderShowcase}/>
          <Stack.Screen name='AddServiceFromScreen' options={{animation:'slide_from_right',title:'Add Services'}} component={AddServiceFormScreen} />
          <Stack.Screen name='ProviderProfileScreen' options={{animation:'slide_from_right',title:'Profile'}} component ={ProviderProfileScreen}/>
          <Stack.Screen name='ServiceofProviderScreen' options={{animation:'slide_from_right',title:'Service'}} component={ServiceofProviderScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )

  }

  return (
    <Provider store={store} >
      <CustomNavigationConatiner />

    </Provider>
  );
}

export default App;
