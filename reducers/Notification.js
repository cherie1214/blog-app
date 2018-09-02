import * as types from '../actions/ActionTypes';

const initialState = {
    http: {
        //INIT: 초기
        //GETTING: 요청 중
        //FAILED: 요청 실패
        //SUCCESS: 요청 성공
        status: 'INIT',
        result: null,
    },
};

export default function notification(state = initialState, action) {
    switch(action.type) {
        //getting
        case types.NOTIFICATION_SAVING:
            return {
            ...state,
            http: {
                ...state.http,
                status: "SAVING",
            },
        };
        case types.NOTIFICATION_GET_SUCCESS:
            return {
            ...state,
            http: {
                ...state.http,
                status: "SUCCESS",
                result: action.id,
            },
        };
        case types.NOTIFICATION_GET_FAILURE:
            return {
            ...state,
            http: {
                ...state.http,
                status: "FAILED",
            },
        };

        case types.NOTIFICATION_INIT:
            return {
            ...state,
            http: {
                ...state.http,
                status: "INIT",
            },
        };

        
        //default   
        default:
            return state;
    }
}