import axios from "axios"
import { USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL,
     USER_LOGIN_REQUIST,USER_DETAILS_FAIL ,USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_REQUIST, USER_REGISTER_SUCCESS, USER_LIST_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USERS_UPDATE_REQUEST, USERS_UPDATE_FAIL, USERS_UPDATE_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, ORDER_LIST_MY_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "./types"

export const login = (email,password) => async dispatch =>{
    try {
        dispatch({
            type:USER_LOGIN_REQUIST
        })
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const res = await axios.post('/api/users/login',{email,password},config)
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:res.data
        })
        localStorage.setItem('userInfo',JSON.stringify(res.data))
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
            
        })
    }
}
export const register = (name,email,password) => async dispatch =>{
    try {
        dispatch({
            type:USER_REGISTER_REQUIST,
        })
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/users/register',{name,email,password},config)
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:res.data
        })
        localStorage.setItem('userInfo',JSON.stringify(res.data))
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
            
        })
    }
}
export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    dispatch({
        type:USER_LOGOUT
    })
    dispatch({
        type:USER_DETAILS_RESET
    })
    dispatch({
        type:ORDER_LIST_MY_RESET
    })
    dispatch({
        type:USER_LIST_RESET
    })
}
export const getUserDetails = (id) => async (dispatch,getState) =>{
    dispatch({
        type:USER_DETAILS_REQUEST
    })
    try {
        const { userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
export const updateUserProfile = (user) => async (dispatch,getState) =>{
    dispatch({
        type:USER_UPDATE_PROFILE_REQUEST
    })
    try {
        const { userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const res = await axios.put(`/api/users/me`,user,config)
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:res.data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:res.data
        })
         localStorage.setItem('userInfo',JSON.stringify(res.data))
    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
            
        })
    }
}

export const listUser = () => async (dispatch,getState) =>{
    dispatch({
        type:USER_LIST_REQUEST
    })
    try {
       const { userLogin : {userInfo} } = getState()
        const config = {
             headers:{
                 Authorization:`Bearer ${userInfo.token}`
             }
        }
        const res = await axios.get(`/api/users/`,config)
        dispatch({
            type:USER_LIST_SUCCESS,
            payload:res.data
        })
         
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
            
        })
    }
}
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/users/${id}`, config)
  
      dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
            
        })
    }
  }
  
export const updateUser = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${userInfo.token}`
        },
      }
  
      const { data } = await axios.put(`/api/users/${user._id}`, user, config)
  
      dispatch({ type: USER_UPDATE_SUCCESS })
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  
    } catch (error) {
      
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      })
    }
  }