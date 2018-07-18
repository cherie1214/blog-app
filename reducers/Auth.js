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
    }
};

export default function auth(state = initialState, action) {
    switch(action.type) {

        //sign in
        case types.AUTH_LOGIN:
            return {
                ...state,
                http: {
                    ...state.http,
                    status: 'LOGIN'
                },
                status: {
                    isLoggedIn: true,
                }
            };
        case types.AUTH_LOGOUT:
            return {
                ...state,
                http: {
                    ...state.http,
                    status: 'LOGOUT'
                },
                status: {
                    isLoggedIn: false,
                }
            };
        case types.AUTH_GETTING:
            return {
                ...state,
                http: {
                    ...state.http,
                    status: 'GETTING'
                }
            };
        case types.AUTH_GET_SUCCESS:
            return {
                status: {
                    isLoggedIn: false,
                    currentUser: action.users,
                },
                http: {
                    ...state.http,
                    status: 'SUCCESS'
                }
            };
        case types.AUTH_GET_FAILURE:
            return {
                ...state,
                http: {
                    ...state.http,
                    status: 'FAIL'
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