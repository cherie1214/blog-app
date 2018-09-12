import * as types from '../actions/ActionTypes';

const initialState = {
    notifyIcon: false,
    likeIcon: false,
};


export default function feed(state = initialState, action) {
    switch(action.type) {
        //Http 상태
        case types.NOTIFY_SET_ICON:
            return {
                ...state,
                notifyIcon : action.notifyIcon
            };
        case types.LIKE_SET_ICON:
            return {
                ...state,
                likeIcon : action.likeIcon
            };
        default:
            return state;
    }
}