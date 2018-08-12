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

export default function article(state = initialState, action) {
    switch(action.type) {
        //getting
        case types.ARTICLE_GETTING:
            return {
            ...state,
            http: {
                ...state.http,
                status: "GETTING",
            },
        };
        case types.ARTICLE_GET_SUCCESS:
            return {
            ...state,
            http: {
                ...state.http,
                status: "SUCCESS",
                result: action._id,
            },
        };
        case types.ARTICLE_GET_FAILURE:
            return {
            ...state,
            http: {
                ...state.http,
                status: "FAILED",
            },
        };

        case types.ARTICLE_INIT:
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