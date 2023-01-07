import { USER_LOGIN_FAIL,
     USER_LOGIN_REQUIST,
      USER_LOGIN_SUCCESS,
       USER_LOGOUT,
        USER_REGISTER_FAIL,
         USER_REGISTER_REQUIST, 
         USER_REGISTER_SUCCESS,
         USER_DETAILS_FAIL,
         USER_DETAILS_REQUEST,
         USER_DETAILS_RESET,
         USER_DETAILS_SUCCESS,
         USER_LIST_REQUEST,
         USER_LIST_SUCCESS,
         USER_LIST_FAIL,
         USER_LIST_RESET,
         USERS_UPDATE_REQUEST,
         USERS_UPDATE_SUCCESS,
         USERS_UPDATE_FAIL,
         USERS_UPDATE_RESET,
         USER_DELETE_REQUEST,
         USER_DELETE_SUCCESS,
         USER_DELETE_FAIL,
         USER_UPDATE_PROFILE_REQUEST,
         USER_UPDATE_PROFILE_SUCCESS,
         USER_UPDATE_PROFILE_RESET,
         USER_UPDATE_PROFILE_FAIL,
         USER_UPDATE_REQUEST,
         USER_UPDATE_SUCCESS,
         USER_UPDATE_FAIL,
         USER_UPDATE_RESET
        } from '../actions/types'
const initialState = {
}

export const userLoginReducer = (state = initialState , action) => {
    const {type,payload} = action
    switch(type){
        case USER_LOGIN_REQUIST:
            return{
                loading:true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfo:payload,
                loading:false
            }
        case USER_LOGIN_FAIL:
            return{
                ...state,
                error:payload,
                loading:false
            }
        case USER_LOGOUT:
            return {}
        default :
         return state
    }
}
export const registerReducer = (state = initialState, action)=>{
    const {type,payload} = action
    switch(type){
        case USER_REGISTER_REQUIST:
            return{
                loading:true
            }
        case USER_REGISTER_SUCCESS:
            return{
                ...state,
                userInfo:payload,
                loading:false
            }
        case USER_REGISTER_FAIL:
            return{
                ...state,
                error:payload,
                loading:false
            }
        default : 
          return state
    }
}
export const userDetailsReducer = (state = {user:{}} ,action) =>{
    const {type,payload} = action;
    switch(type){
        case USER_DETAILS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case USER_DETAILS_SUCCESS:
            return{
                loading:false,
                user:payload
            }
        case USER_DETAILS_FAIL:
            return{
                loading:false,
                error:payload
            }
        case USER_DETAILS_RESET:
            return{}
        default:
            return state 
            
    }
}

export const userUpdateProfileReducer = (state = {}, action)=>{
    const {type,payload} = action
    switch(type){
        case USER_UPDATE_PROFILE_REQUEST:
            return{
                loading:true
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return{
                ...state,
                userInfo:payload,
                loading:false,
                success:true,
            }
        case USER_UPDATE_PROFILE_FAIL:
            return{
                ...state,
                error:payload,
                loading:false
            }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}
export const userListReducer = (state = {users:[]}, action)=>{
    const {type,payload} = action
    switch(type){
        case USER_LIST_REQUEST:
            return{
                loading:true
            }
        case USER_LIST_SUCCESS:
            return{
                loading:false,
                users:payload,
                success:true
            }
        case USER_LIST_FAIL:
            return{
                loading:false,
                error:payload
            }
        case USER_LIST_RESET:
            return {users : []}
        default :
            return state
    }
}
export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return { loading: true }
      case USER_DELETE_SUCCESS:
        return { loading: false, success: true }
      case USER_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true }
      case USER_UPDATE_SUCCESS:
        return { loading: false, success: true }
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case USER_UPDATE_RESET:
        return {
          user: {},
        }
      default:
        return state
    }
  }