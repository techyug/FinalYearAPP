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
     
    });
   
    socket.on('disconnect',(reason,dis)=>{
        
    })
    
  }
  return socket;
};
