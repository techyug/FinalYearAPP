
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feed from '../Tabs/Feed';
import SearchTab from '../Tabs/SearchTab';
import Proflletab from '../Tabs/Proflletab';
import ServiceProviderDashBord from '../TabServiceProvider/ServiceProviderDashBord';
import MyBookings from '../TabServiceProvider/MyBookings';
import Conversations from '../TabServiceProvider/Conversations';
import { useDispatch, useSelector } from 'react-redux';
import { getISTLocal, showLocalNotification } from '../Constants/Async_functions';
import { connectToSocket } from '../Constants/GlobalSocket';
import { useEffect } from 'react';
import DbOperations from '../LocalStorage/index'

import { messagesFromSQLiteToRedux, newMessageToRedux, updateMessages } from '../Redux/actions';
import { MessageStatus } from '../Constants/Gconstants';



const Tab = createMaterialBottomTabNavigator();






export default function HomeScreen() {

    const userData = useSelector((state => state.userData))
    const messages = useSelector((state => state.messages))
    const messages1 = useSelector((state) => state.messages1) || new Map();
    const commonUserData = useSelector(state => state.commonUserData)
   

    // const [totalMessages,setTotalMessages] = useState(0);

    const dispatch = useDispatch();

    var socket = connectToSocket()

    useEffect(() => {
        
        DbOperations.createMessagesTable();

        DbOperations.fetchAllMessagesFromTable(commonUserData.role).then((res) => {
            // we have to set messages to redux 
            dispatch(messagesFromSQLiteToRedux(res))// saving sqlite messages to redux
            console.log("all messages in sqlite lenfth for role = ",commonUserData.role, res.length)
        }).catch(err => {
            console.log("err", err)
        });



        console.log("active emit ")
        socket.emit('im-active', { token: userData.token }, ack => {
            console.log(ack)

        })


        socket.on('new-message', (data) => {
            console.log("new message received")
            data.receivedAt = getISTLocal().toString();
            console.log(data)
            console.log("messages before dispatch", messages)
            console.log(data)
            // messages.push(data)
            //  dispatch(updateMessages(messages))
            //dispatch(updateMessages([...messages,data]))

            DbOperations.insertMessageToTable(userData.role, data.messageId, data.senderName, data.fromPhone, commonUserData.userPhone, commonUserData.userName, data.msg, false, MessageStatus.messageReceived, data);

            data.toPhone = commonUserData.userPhone
            data.amIsender = false;
            dispatch(newMessageToRedux(data))
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
                <Tab.Screen options={{ tabBarIcon: 'account', title: 'Profile', tabBarBadge: messages1.size }} name="Profile" component={Proflletab} />
            </Tab.Navigator >

        );
    }
    else return (
        <Tab.Navigator >
            <Tab.Screen options={{ tabBarIcon: 'view-dashboard', title: 'Dashbord' }} name="Dashbord" component={ServiceProviderDashBord} />
            <Tab.Screen options={{ tabBarIcon: 'book-clock-outline', title: 'Bookings' }} name="Bookings" component={MyBookings} />
            <Tab.Screen options={{ tabBarIcon: 'chat-outline', title: 'Conversation', tabBarBadge: messages1.size }} name="Conversation" component={Conversations} />
        </Tab.Navigator>
    )





}
