
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ForgotPassScreen from './Screens/ForgotPassScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';




const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  >
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
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
