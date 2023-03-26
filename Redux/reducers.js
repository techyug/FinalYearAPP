import axios from "axios";
import { ALL_MESSAGES_FROM_SQLITE_TO_REDUX, INSERT_NEW_MESSAGE, MESSAGE_UPDATE, UPDATE_INFO, USER_LOGIN, USER_LOGOUT } from "./actionType";
const initialState = {
    isLoggedIn: false,
    userData: null,
    commonUserData: {
        userPhone:'',
        userName:"",
        role:''
    },
    messages: [],
    info: {
        msg: "Welcome",
        show: true,
        infoType: 'Success'
    },
    messages1: new Map()
}
export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            const { userData } = action;
            const commonUserData = {
                role:userData.role,
                userName :userData.role == 'user' ? userData.user_name : userData.ServiceProvideName,
                userPhone :userData.role == 'user' ? userData.user_phone : userData.ServiceProviderPhone
            }
            return { ...state, isLoggedIn: true, userData: action.userData, commonUserData }
        case ALL_MESSAGES_FROM_SQLITE_TO_REDUX:
            let messages1 = new Map(state.messages1); // create a new Map with the existing messages
            action.allMessagesArray.forEach(element => {
                const phoneKey = element.toPhone === state.commonUserData.userPhone
                ? element.fromPhone
                : element.toPhone;

            if (messages1.has(phoneKey)) {
                messages1.get(phoneKey).push(element); // modify the new Map object
            } else {
                messages1.set(phoneKey, [element]); // modify the new Map object
            }
            });
            return {
                ...state,messages1,
            }
        case USER_LOGOUT:
            return {
                ...state, isLoggedIn: false, userData: null, messages: []
            }
        case MESSAGE_UPDATE:
            return { ...state, messages: action.newMessage }
        case UPDATE_INFO:
            return { ...state, info: action.newinfoData }
        case INSERT_NEW_MESSAGE:
            const { newMessage } = action;
            const messages = new Map(state.messages1); // create a new Map with the existing messages
            const phoneKey = newMessage.toPhone === state.commonUserData.userPhone
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
       
        default:
            return state;
    }
};