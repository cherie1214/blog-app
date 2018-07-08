import {
  AUTH_LOGIN, 
  AUTH_LOGOUT,
  AUTH_GETTING,
  AUTH_GET_SUCCESS,
  AUTH_GET_FAILURE,
} from './ActionTypes'

export function requestLogin(){
  return {
    type: AUTH_LOGIN,
  }
}

export function requestLogout(){
  return {
    type: AUTH_LOGOUT,
  }
}