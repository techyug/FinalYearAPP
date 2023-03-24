import axios from "axios";
import { INSERT_NEW_MESSAGE, MESSAGE_UPDATE, UPDATE_INFO, USER_LOGIN, USER_LOGOUT } from "./actionType";
const initialState = {
    isLoggedIn:false,
    userData:null,
    messages:[],
    info : {
        msg:"Welcome",
        show:true,
        infoType:'Success'
    },
    messages1:new Map()
}
export const mainReducer = (state = initialState,action)=>{
    switch(action.type){
        case USER_LOGIN:
            return {...state,isLoggedIn:true,userData:action.userData}
        case USER_LOGOUT:
            return{
                ...state,isLoggedIn:false,userData:null,messages:[]
            }
        case MESSAGE_UPDATE:
            return {...state,messages:action.newMessage}
        case UPDATE_INFO:
            return {...state,info:action.newinfoData}
        case INSERT_NEW_MESSAGE:
            const { newMessage } = action;
            const messages = new Map(state.messages1); // create a new Map with the existing messages
            const phoneKey = newMessage.toPhone === '0' || newMessage.toPhone.length < 10
              ? newMessage.fromPhone
              : newMessage.toPhone;
          
            if (messages.has(phoneKey)) {
              messages.get(phoneKey).push(newMessage); // modify the new Map object
            } else {
              messages.set(phoneKey, [newMessage]); // modify the new Map object
            }
          
            return {
              ...state,
              messages1: messages, // return a new state object with the updated Map
            };
            // {
            //     if(action.newMessage.toPhone=="0" || action.newMessage.toPhone.length<10){
            //         if(state.messages1.has(action.newMessage.fromPhone)){
            //             state.messages1.get(action.newMessage.fromPhone).push(action.newMessage)

            //         }else{
            //             state.messages1.set(action.newMessage.fromPhone,new Array(action.newMessage))
            //         }
            //     }else{
            //         if(state.messages1.has(action.newMessage.toPhone)){
            //             state.messages1.get(action.newMessage.toPhone).push(action.newMessage)

            //         }else{
            //             state.messages1.set(action.newMessage.toPhone,new Array(action.newMessage))
            //         }
            //     }
                

            //     return {...state}
            // }
        default :
        return state;     
    }
};