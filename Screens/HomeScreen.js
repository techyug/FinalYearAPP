
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from '../Tabs/Feed';
import SearchTab from '../Tabs/SearchTab';
import Proflletab from '../Tabs/Proflletab';
import { useNavigation } from '@react-navigation/native';
import ServiceProviderDashBord from '../TabServiceProvider/ServiceProviderDashBord';
import MyBookings from '../TabServiceProvider/MyBookings';
import Conversations from '../TabServiceProvider/Conversations';
import { useSelector } from 'react-redux';


const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {

   const userData = useSelector((state=>state.userData))

   if(userData.role=="user"){
    return (
        <Tab.Navigator 
            barStyle={{ backgroundColor: 'rgb(210,0,100)' }}
        >
            <Tab.Screen options={{ tabBarIcon: 'home', title: 'Home' }}  name="Feed" component={Feed} />
            <Tab.Screen options={{ tabBarIcon: 'cloud-search' }} name="Search" component={SearchTab} />
            <Tab.Screen options={{ tabBarIcon: 'account', title: 'Profile' }} name="Profile" component={Proflletab} />
        </Tab.Navigator >

    );
   }
   else return (
    <Tab.Navigator >
        <Tab.Screen options={{ tabBarIcon: 'view-dashboard', title: 'Dashbord', }}  name="Dashbord" component={ServiceProviderDashBord} />
        <Tab.Screen options={{ tabBarIcon: 'book-clock-outline', title: 'Bookings' }} name="Bookings" component={MyBookings} />
        <Tab.Screen options={{ tabBarIcon: 'chat-outline', title: 'Conversation' }} name="Conversation" component={Conversations} />
    </Tab.Navigator>
   )
    
    

    
   
}
