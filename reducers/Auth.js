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
    status: {
        isLoggedIn: false,
        currentUser: '',
    },
    login: {
        logged: false,
        nickname: "",
    }
};

export default function auth(state = initialState, action) {
    switch(action.type) {

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
                    logged: true,
                    nickname: action.nickname,
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


        //default   
        default:
            return state;
    }
}