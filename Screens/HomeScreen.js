
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from '../Tabs/Feed';
import SearchTab from '../Tabs/SearchTab';
import Proflletab from '../Tabs/Proflletab';
import { useNavigation } from '@react-navigation/native';
import ServiceProviderDashBord from '../TabServiceProvider/ServiceProviderDashBord';
import MyBookings from '../TabServiceProvider/MyBookings';
import Conversations from '../TabServiceProvider/Conversations';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { callApi, getISTLocal, showLocalNotification } from '../Constants/Async_functions';
import { connectToSocket } from '../Constants/GlobalSocket';
import { serverIP } from '../Constants/IPofBackned';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { updateMessages } from '../Redux/actions';


const Tab = createMaterialBottomTabNavigator();


export default function HomeScreen() {

    const userData = useSelector((state => state.userData))
    const messages = useSelector((state=>state.messages))
    const dispatch = useDispatch();

    var socket = connectToSocket()
    
    useEffect(() => {
        console.log("active emit ")
        socket.emit('im-active', { token: userData.token }, ack => {
            console.log(ack)

        })
        socket.on('new-message', (data) => {
            console.log("new message received")
            data.receivedAt = getISTLocal().toString();
            
            console.log("messages before dispatch",messages)
           // messages.push(data)
          //  dispatch(updateMessages(messages))
          dispatch(updateMessages([...messages,data]))
            showLocalNotification(`${data.senderName}`, `${data.msg}`)
        })
      

    }, [])


    if (userData.role === "user") {
        return (
            <Tab.Navigator
                barStyle={{ backgroundColor: 'rgb(210,0,100)' }}
            >
                <Tab.Screen options={{ tabBarIcon: 'home', title: 'Home' }} name="Feed" component={Feed} />
                <Tab.Screen options={{ tabBarIcon: 'cloud-search' }} name="Search" component={SearchTab} />
                <Tab.Screen options={{ tabBarIcon: 'account', title: 'Profile', tabBarBadge: messages.length }} name="Profile" component={Proflletab} />
            </Tab.Navigator >

        );
    }
    else return (
        <Tab.Navigator >
            <Tab.Screen options={{ tabBarIcon: 'view-dashboard', title: 'Dashbord', }} name="Dashbord" component={ServiceProviderDashBord} />
            <Tab.Screen options={{ tabBarIcon: 'book-clock-outline', title: 'Bookings' }} name="Bookings" component={MyBookings} />
            <Tab.Screen options={{ tabBarIcon: 'chat-outline', title: 'Conversation', tabBarBadge: messages.length }} name="Conversation" component={Conversations} />
        </Tab.Navigator>
    )





}
