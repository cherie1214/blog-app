import { 
  AUTH_GETTING,
  AUTH_GET_SUCCESS,
  AUTH_GET_FAILURE, 

  AUTH_SIGNIN_ERROR,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNIN_SUCCESS,

  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_SIGNUP_INIT,

  Like_Add,
  Like_Remove,
  Like_Toggle,  
} from './ActionTypes';

import axios from 'axios';
import { AsyncStorage } from 'react-native';

//action creators
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

//sign in
export function signInError() {
    return {
        type: AUTH_SIGNIN_ERROR,

    };
}
export function signInSuccess(nickname) {
    return {
        type: AUTH_SIGNIN_SUCCESS,
        nickname
    };
}
export function signInFailure() {
    return {
        type: AUTH_SIGNIN_FAILURE,

    };
}

//sign up
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
export function userSignIn(userInfo) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getting());

        // API REQUEST
        return axios.post('http://localhost:8000/api/auth/signIn', userInfo)
        .then((res) => {
            // SUCCEED
            const status = res.data.status;
            const nickname = res.data.nickname;
            const id = res.data.id;

            // alert(nickname);
            // alert(JSON.stringify(userInfo));          

            switch(status){
                case "SIGNIN_ERROR" : dispatch(signInError());
                    break;
                case "SIGNIN_FAILED" : dispatch(signInFailure());
                    break;
                case "SIGNIN_SUCCESS" : 
                    try {
                        AsyncStorage.setItem('@BlogApp.Auth', JSON.stringify({
                            id, 
                            nickname
                        }))
                    } catch(error) {
                        alert("Storage Error: " + error)
                    } finally {
                        dispatch(signInSuccess(nickname));
                        break;       

                    }

            }  

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
            if(res.data.status === "SIGNUP_SUCCESS"){
                dispatch(signUpSuccess());
            } else {
                if (res.data.status === "SIGNUP_ID_DUPLICATED"){
                    alert("아이디가 중복 되었습니다.");
                } 
                if (res.data.status === "SIGNUP_NICKNAME_DUPLICATED"){
                    alert("닉네임이 중복 되었습니다.");
                }
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
