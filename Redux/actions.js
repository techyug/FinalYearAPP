import { ADDITION, ALL_MESSAGES_FROM_SQLITE_TO_REDUX, INSERT_NEW_MESSAGE, MESSAGE_UPDATE, ONLINE_USERLIST_CHANGED, UPDATE_INFO, USER_LOGIN, USER_LOGOUT } from "./actionType";
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
export function updateMessages(messages){
    return {
        type:MESSAGE_UPDATE,
        newMessage:messages,
    }
}
export function updateInfo(infoData){
    return {
        type:UPDATE_INFO,
        newinfoData:infoData
    }
}
export function newMessageToRedux(newMessage = {msg:"default message",toPhone:"287382242",fromPhone:"283789242"}){
    return {
        type:INSERT_NEW_MESSAGE,
        newMessage:newMessage
    }
}
export function messagesFromSQLiteToRedux(allMessagesArray=[]){
    return {
        type:ALL_MESSAGES_FROM_SQLITE_TO_REDUX,
        allMessagesArray
    }
}