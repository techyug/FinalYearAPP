import { MESSAGE_UPDATE, UPDATE_INFO, USER_LOGIN, USER_LOGOUT } from "./actionType";
const initialState = {
    isLoggedIn:false,
    userData:null,
    messages:[],
    info : {
        msg:"Welcome",
        show:true,
        infoType:'Success'
    }
}
export const mainReducer = (state = initialState,action)=>{
    switch(action.type){
        case USER_LOGIN:
            return {...state,isLoggedIn:true,userData:action.userData}
        case USER_LOGOUT:
            return{
                ...state,isLoggedIn:false,userData:null
            }
        case MESSAGE_UPDATE:
            return {...state,messages:[...state.messages,action.newMessage]}
        case UPDATE_INFO:
            return {...state,info:action.newinfoData}
        default :
        return state;     
    }
};