
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from '../Tabs/Feed';
import SearchTab from '../Tabs/SearchTab';
import Proflletab from '../Tabs/Proflletab';
import { useNavigation } from '@react-navigation/native';
import ServiceProviderDashBord from '../TabServiceProvider/ServiceProviderDashBord';
import MyBookings from '../TabServiceProvider/MyBookings';
import Conversations from '../TabServiceProvider/Conversations';
import { useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { showLocalNotification } from '../Constants/Async_functions';
import { connectToSocket } from '../Constants/GlobalSocket';
import { serverIP } from '../Constants/IPofBackned';
import { useEffect } from 'react';

const Tab = createMaterialBottomTabNavigator();


export default function HomeScreen() {

   const userData = useSelector((state=>state.userData))
    const Messages = useSelector(state=>state.messages)
    
    
    var socket = connectToSocket();
    useEffect(()=>{
       
    })
   

   if(userData!=null&& userData.role==="user"){
    return (
        <Tab.Navigator 
            barStyle={{ backgroundColor: 'rgb(210,0,100)' }}
        >
            <Tab.Screen options={{ tabBarIcon: 'home', title: 'Home' }}  name="Feed" component={Feed} />
            <Tab.Screen options={{ tabBarIcon: 'cloud-search' }} name="Search" component={SearchTab} />
            <Tab.Screen options={{ tabBarIcon: 'account', title: 'Profile' ,tabBarBadge:Messages.length}} name="Profile" component={Proflletab} />
        </Tab.Navigator >

    );
   }
   else return (
    <Tab.Navigator >
        <Tab.Screen options={{ tabBarIcon: 'view-dashboard', title: 'Dashbord', }}  name="Dashbord" component={ServiceProviderDashBord} />
        <Tab.Screen options={{ tabBarIcon: 'book-clock-outline', title: 'Bookings' }} name="Bookings" component={MyBookings} />
        <Tab.Screen options={{ tabBarIcon: 'chat-outline', title: 'Conversation',tabBarBadge:Messages.length }} name="Conversation" component={Conversations} />
    </Tab.Navigator>
   )
    
    

    
   
}
