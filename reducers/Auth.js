import * as types from '../actions/ActionTypes';

const initialState = {
  login: {
    status: "INIT",
  },
  status: {
    isLoggedIn: false,
    currentUser: "",
  }
}

export default function auth(state = initialState, action){
  switch(action.type){
    case types.AUTH_LOGIN: 
      return {
        ...initialState,
        login: {
          status: "LOGIN",
        },
        status: {
          isLoggedIn: true,
        },
      };
    case types.AUTH_LOGOUT: 
      return {
        ...initialState,
        login: {
          status: "LOGOUT",
        },
        status: {
          isLoggedIn: false,
        },
      }
    default:
      return state;
  }
}