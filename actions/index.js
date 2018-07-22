import { 
  AUTH_GETTING,
  AUTH_GET_SUCCESS,
  AUTH_GET_FAILURE, 

  AUTH_SIGNIN_ERROR,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_INIT,

  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_SIGNUP_INIT,

  AUTH_SIGNOUT,
} from './ActionTypes';

import axios from 'axios';
import { AsyncStorage } from 'react-native';

//action creators
export function getting() {
  return {
      type: AUTH_GETTING,
  };
}

export function getSuccess() {
  return {
      type: AUTH_GET_SUCCESS,
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
export function signInSuccess(id, nickname) {
    return {
        type: AUTH_SIGNIN_SUCCESS,
        id,
        nickname
    };
}
export function signInFailure() {
    return {
        type: AUTH_SIGNIN_FAILURE,

    };
}

export function signInInit() {
    return {
        type: AUTH_SIGNIN_INIT
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


//sign out
export function signout(){
    return {
        type: AUTH_SIGNOUT
    }
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
                        dispatch(signInSuccess(id, nickname));
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


//storage 조회
export function getStorage(){
    return async(dispatch) => {
        try {
            const _storedData = await AsyncStorage.getItem('@BlogApp.Auth');
            if(_storedData){
                _storedData = JSON.parse(_storedData);
                dispatch(signInSuccess(_storedData.id, _storedData.nickname));
            }
        } catch(error) {
            alert("ERROR RETRIEVEING data: " + error);
        }
    }
} 

export function signOut(){
    return (dispatch) => {
        AsyncStorage.removeItem('@BlogApp.Auth');
        dispatch(signout());
    }
}