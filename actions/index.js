import {
  AUTH_LOGIN, 
  AUTH_LOGOUT,
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