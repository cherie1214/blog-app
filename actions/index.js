import { 
  AUTH_LOGIN, 
  AUTH_LOGOUT,
  AUTH_GETTING,
  AUTH_GET_SUCCESS,
  AUTH_GET_FAILURE, 
  Like_Add,
  Like_Remove,
  Like_Toggle,
} from './ActionTypes';

import axios from 'axios';

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
