import { ADDITION, MESSAGE_UPDATE, ONLINE_USERLIST_CHANGED, USER_LOGIN, USER_LOGOUT } from "./actionType";
import { SUBSTACTION } from "./actionType";
export function addition() {
    return {
      type: ADDITION,
      value:6,
    };
  }
export function userLogin(userData){
    return {
        type:USER_LOGIN,
        userData:userData,
       
    }
}
export function userLogout(){
    return {
        type:USER_LOGOUT,
        
    }
}
export function onlineUserListChange(list){
    return {
        type:ONLINE_USERLIST_CHANGED,
        list:list
    }
}
export function updateMessages(message){
    return {
        type:MESSAGE_UPDATE,
        newMessage:message,
    }
}