
import { Button, Text, View } from 'react-native';
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
const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
function App() {

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

            const data = {
              msg: "No new MSG",
              show: false,
            }
            dispatch(updateInfo(data))
          }} />
        </View>
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
          <Stack.Screen name='Register' options={{ headerShown: false, title: 'Regiter ',animation:'fade' }} component={RegisterScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false, }} component={HomeScreen} />
          <Stack.Screen name='Service' component={ServiceScreen} />
          <Stack.Screen name='ProviderShowCase' component={ServiceProviderShowcase}/>
          <Stack.Screen name='AddServiceFromScreen' options={{animation:'slide_from_right',title:'Add Services'}} component={AddServiceFormScreen} />
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
