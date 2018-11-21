import * as types from '../actions/ActionTypes';

const initialState = {
    http: {
        //INIT: 초기
        //GETTING: 요청 중
        //FAILED: 요청 실패
        //SUCCESS: 요청 성공
        status: 'INIT',
        result: 'INIT',
    },
    login: {
        loggedIn: false,
        id: "",
        _id: "",
        nickname: "",
        token: "",
        profileImg: "",
    }
};

export default function auth(state = initialState, action) {
    switch(action.type) {
        //getting
        case types.AUTH_GETTING:
            return {
            ...state,
            http: {
                ...state.http,
                status: "GETTING",
            },
        };
        case types.AUTH_GET_SUCCESS:
            return {
            ...state,
            http: {
                ...state.http,
                status: "SUCCESS",
            },
        };
        case types.AUTH_GET_FAILURE:
            return {
            ...state,
            http: {
                ...state.http,
                status: "FAILED",
            },
        };

        //sign in
        case types.AUTH_SIGNIN_ERROR:
            return {
            ...state,
            http: {
                ...state.http,
                status: "SUCCESS",
                result: "FAILED"
            },
        };
        case types.AUTH_SIGNIN_FAILURE:
            return {
            ...state,
            http: {
                ...state.http,
                status: "SUCCESS",
                result: "FAILED"
            },
        };    
        case types.AUTH_SIGNIN_SUCCESS:
            return {
            ...state,
            http: {
                ...state.http,
                status: "SUCCESS",
                result: "SUCCESS"
            },
            login: {
                ...state.login,
                loggedIn: true,
                id: action.id,
                _id: action._id,
                nickname: action.nickname,
                profileImg: action.profileImg,
                token: action.token,
            }
        };    
        case types.AUTH_SIGNIN_INIT:
            return {
                ...state,
                http: {
                    ...state.http,
                    status: 'INIT',
                    result: 'INIT',
                }
            };    
        
        //sign up
        case types.AUTH_SIGNUP_SUCCESS:
            return {
                ...state,
                http: {
                    status: 'SUCCESS',
                    result: 'SUCCESS'
                }
            };
        case types.AUTH_SIGNUP_FAILURE:
            return {
                ...state,
                http: {
                    status: 'SUCCESS',
                    result: 'FAILURE'
                }
            };

        case types.AUTH_SIGNUP_INIT:
            return {
                ...state,
                http: {
                    ...state.http,
                    result: 'INIT'
                }
            };    

        //sign out
        case types.AUTH_SIGNOUT:
            return {
                ...state,
                http: {
                    status: 'INIT',
                    result: 'INIT'
                },
                login: {
                    loggedIn: false,
                    id: "",
                    _id: "",
                    nickname: "",
                    profileImg: "",
                }
            }

        //change pw
        case types.AUTH_CHANGE_PW:
            return {
                ...state,
                http: {
                    status: 'SUCCESS',
                    result: 'SUCCESS'
                },
                login: {
                    loggedIn: false,
                }
            }  
            
        //change nickname
        case types.CHANGE_NICKNAME:
            return {
                ...state,
                http: {
                    status: 'SUCCESS',
                    result: 'SUCCESS'
                },
                login: {
                    ...state.login,
                    nickname: action.nickname,                    
                }
            }  
            
        //change profileImg
        case types.CHANGE_PROFILE_IMG:
            return {
                ...state,
                http: {
                    status: 'SUCCESS',
                    result: 'SUCCESS'
                },
                login: {
                    ...state.login,
                    profileImg: action.profileImg,                    
                }
            }      

        //default   
        default:
            return state;
    }
}