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

  AUTH_CHANGE_PW,
  AUTH_CHANGE_PW_FAILURE,

  CHANGE_NICKNAME,
  CHANGE_PROFILE_IMG,

  AUTH_INIT,
} from './ActionTypes';

import axios from 'axios';
import { domain } from '../config';
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
export function signInSuccess(id, _id, nickname, profileImg, token) {
    return {
        type: AUTH_SIGNIN_SUCCESS,
        id,
        _id,
        nickname,
        profileImg,
        token
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

//change
export function changePw(pw){
    return {
        type: AUTH_CHANGE_PW,
        pw
    }
}

export function changePwFailure(){
    return {
        type: AUTH_CHANGE_PW_FAILURE,
    }
}


export function changeNickname(nickname){
    return{
        type: CHANGE_NICKNAME,
        nickname
    }
}

export function changeProfileImg(profileImg){
    return{
        type: CHANGE_PROFILE_IMG,
        profileImg
    }
}


export function authInit() {
    return {
        type : AUTH_INIT
    }
}

//action functions

//Sign In
export function userSignIn(userInfo) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getting());

        // API REQUEST
        return axios.post(domain + '/api/auth/signIn', userInfo)
        .then((res) => {
            // SUCCEED
            const status = res.data.status;
            const nickname = res.data.nickname;
            const id = res.data.id;
            const _id = res.data._id;
            const profileImg = res.data.profileImg;
            // const profileImg = "https://i.pinimg.com/564x/23/9d/64/239d649cbeaf9466a17620a1209c6f92.jpg";
            const token = res.data.token;

            // alert(token);
            // alert(JSON.stringify(profileImg));          

            switch(status){
                case "SIGNIN_ERROR" : dispatch(signInError());
                    break;
                case "SIGNIN_FAILED" : dispatch(signInFailure());
                    break;
                case "SIGNIN_SUCCESS" : 
                    try {
                        AsyncStorage.setItem('@BlogApp.Auth', JSON.stringify({
                            id, 
                            _id,
                            nickname,
                            profileImg,
                            token
                        }))
                    } catch(error) {
                        alert("Storage Error: " + error)
                    } finally {
                        dispatch(signInSuccess(id, _id, nickname, profileImg, token));
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
        return axios.post(domain + '/api/auth/signUp', userInfo)
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

//change password
export function userChangePw(userInfo, token) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getting());

        const header = {
            headers : {
                'x-access-token' : token
            }
        }
  
        // API REQUEST
        return axios.post(domain + '/api/auth/changePw', userInfo, header)
        .then((res) => {
            // alert(JSON.stringify(res.data,0,2))
            const id = res.data.id;
            const pw = res.data.pw;
            // alert(id);
            if(res.data.status === "CHANGE_PW_SUCCESS"){
                dispatch(changePw(pw));
            } else {
                if(res.data.status === "CHANGE_PW_DISCORD"){
                    alert("현재 비밀번호가 일치하지 않습니다.")
                }
                dispatch(changePwFailure());
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
                // alert(JSON.stringify(_storedData))
                dispatch(signInSuccess(_storedData.id, _storedData._id, _storedData.nickname, _storedData.profileImg, _storedData.token ));
            }
        } catch(error) {
            alert("ERROR RETRIEVEING data: " + error);
        }
    }
} 

// sign out
export function signOut(){
    return (dispatch) => {
        AsyncStorage.removeItem('@BlogApp.Auth');
        dispatch(signout());
    }
}

// change nickname
export function changeNicknameRequest (userInfo, token) {
    return (dispatch) => {
        dispatch(getting());

        const header = {
            headers : {
                'x-access-token' : token
            }
        }

        // alert(userInfo + token)

        // API REQUEST
        return axios.post(domain + '/api/auth/changeNickname', userInfo, header)
        .then((res) => {
            if(res.data.status === "CHANGE_NICKNAME_ERROR"){
                alert("ERORR");
            }else if(res.data.status === "CHANGE_NICKNAME_DUPLICATED"){
                // alert("이미 존재하는 닉네임입니다.");
            }else if(res.data.status === "CHANGE_NICKNAME_SUCCESSED"){
                try {
                    AsyncStorage.setItem('@BlogApp.Auth', JSON.stringify({
                        id : userInfo.id,
                        nickname : userInfo.nickname,
                        token
                    }));
                } catch (error) {
                    alert("Storage Error : " + error);
                } finally {
                    // alert("변경되었습니다.");
                    // alert(userInfo.nickname)
                    dispatch(changeNickname(userInfo.nickname));
                }
            }else{
                alert("ERORR");
            }
            // dispatch(authInit());
        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });
    }
}

// change profileImg
// export function changeProfileImgRequest (userInfo, token) {
//     return (dispatch) => {
//         dispatch(getting());

//         const header = {
//             headers : {
//                 'x-access-token' : token
//             }
//         }

//         // alert(userInfo + token)

//         // API REQUEST
//         return axios.post(domain + '/api/auth/changeProfileImg', userInfo, header)
//         .then((res) => {
//             if(res.data.status === "CHANGE_NICKNAME_ERROR"){
//                 alert("ERORR");
//             }else if(res.data.status === "CHANGE_NICKNAME_DUPLICATED"){
//                 // alert("이미 존재하는 닉네임입니다.");
//             }else if(res.data.status === "CHANGE_NICKNAME_SUCCESSED"){
//                 try {
//                     AsyncStorage.setItem('@BlogApp.Auth', JSON.stringify({
//                         id : userInfo.id,
//                         nickname : userInfo.nickname,
//                         token
//                     }));
//                 } catch (error) {
//                     alert("Storage Error : " + error);
//                 } finally {
//                     // alert("변경되었습니다.");
//                     // alert(userInfo.nickname)
//                     dispatch(changeNickname(userInfo.nickname));
//                 }
//             }else{
//                 alert("ERORR");
//             }
//             // dispatch(authInit());
//         }).catch((error) => {
//             // FAILED
//             dispatch(getFailure());
//         });
//     }
// }