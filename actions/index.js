import { 
  AUTH_LOGIN, 
  AUTH_LOGOUT,
  AUTH_GETTING,
  AUTH_GET_SUCCESS,
  AUTH_GET_FAILURE, 
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_SIGNUP_INIT,

  Like_Add,
  Like_Remove,
  Like_Toggle,  
} from './ActionTypes';

import axios from 'axios';

//action creators
export function requestLogin() {
    return {
        type: AUTH_LOGIN
    };
}

export function requestLogout() {
    return {
        type: AUTH_LOGOUT
    };
}

export function getting() {
  return {
      type: AUTH_GETTING,
  };
}

export function getSuccess(users) {
  return {
      type: AUTH_GET_SUCCESS,
      users
  };
}

export function getFailure() {
  return {
      type: AUTH_GET_FAILURE
  };
}

export function signUpSuccess() {
    return {
        type: AUTH_SIGNUP_SUCCESS,

    };
}

export function signUpFailure() {
    return {
        type: AUTH_SIGNUP_FAILURE
    };
}

export function signUpInit() {
    return {
        type: AUTH_SIGNUP_INIT
    };
}


//action functions
//Sign In
export function requestGetUsers() {
  return (dispatch) => {
      // Inform Login API is starting
      dispatch(getting());

      // API REQUEST
      return axios.get('http://localhost:8000/api/get/1')
      .then((res) => {
          // SUCCEED
          const result = JSON.stringify(res.data,0,2)
          dispatch(getSuccess(result));
          
      }).catch((error) => {
          // FAILED
          dispatch(getFailure());
      });
  }    
}


//Sign Up
export function userSignUp(userInfo) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getting());
  
        // API REQUEST
        return axios.post('http://localhost:8000/api/auth/signUp', userInfo)
        .then((res) => {
            // alert(res)
            if(res.data.status === "SUCCESS"){
                dispatch(signUpSuccess());
            } else {
                dispatch(signUpFailure());
            }
        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });
    }    
  }






export function likeAdd() {
    return {
        type: Like_Add,
    };
}
export function likeRemove() {
    return {
        type: Like_Remove,
    };
}
export function likeToggle(status) {
    return {
        type: Like_Toggle,
        status    
    };
}
