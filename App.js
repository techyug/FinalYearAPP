
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ForgotPassScreen from './Screens/ForgotPassScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
// import { initializeApp } from "firebase/app";


// const firebaseConfig = {
//   apiKey: "AIzaSyA5XxiYASALjZRBq2gUg1oyQ458VwmvixI",
//   authDomain: "finalyearapp-9203c.firebaseapp.com",
//   projectId: "finalyearapp-9203c",
//   storageBucket: "finalyearapp-9203c.appspot.com",
//   messagingSenderId: "307395449288",
//   appId: "1:307395449288:web:7c888a2996df292d2b70fd",
//   measurementId: "G-T69SV41F3Y"
// };

// initializeApp(firebaseConfig);


const Stack = createNativeStackNavigator();


function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{
          title: 'Reset Password', headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'rgba(210,0,100,0.9)',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="right button"
              color="#aaa"
            />
          ),
        }} name="ForgotPass" component={ForgotPassScreen} />
        <Stack.Screen name='Register' options={{ headerShown: false, title: 'Regiter ', }} component={RegisterScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false, }} component={HomeScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
