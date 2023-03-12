// socket.js
import io from 'socket.io-client'
import { showLocalNotification } from './Async_functions';


import { serverIP } from './IPofBackned';
const socketUrl = serverIP ;
let socket;

export const connectToSocket = (data) => {
  if (!socket ) {
    
    socket = io(serverIP)
    socket.on('connect', () => {
        showLocalNotification("Socket Connected",`Socket connected with ${serverIP} `)
     console.log("connected to socket")
    });
   socket.on('new-message',(data)=>{
    showLocalNotification("New Message",`${data.msg}`)
   })
    socket.on('disconnect',(reason,dis)=>{
        showLocalNotification("Socket Disconnected",`Socket disconnect with ${serverIP} ,due to ${reason}`)
      console.log("disconnected to socket",reason,dis)
    })
    
  }
  return socket;
};
