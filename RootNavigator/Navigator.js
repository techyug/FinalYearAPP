
import { Button ,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ForgotPassScreen from './Screens/ForgotPassScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ServiceScreen from './Screens/ServiceScreen'
import { Provider } from 'react-redux';
import { store } from './Redux/store';
const Stack = createNativeStackNavigator();



const Navigator = () => {
  return (
    <NavigationContainer>
        
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ title: 'Reset Password'}} name="ForgotPass" component={ForgotPassScreen} />
        <Stack.Screen name='Register' options={{ headerShown: false, title: 'Regiter ', }} component={RegisterScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false, }} component={HomeScreen} />
        <Stack.Screen name='Service' component={ServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator