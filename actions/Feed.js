import { 
  NOTIFY_SET_ICON,
  LIKE_SET_ICON,
} from './ActionTypes'
import axios from 'axios';
import { domain } from '../config';

//action creator
export const setNotifyIcon = (bool) => {
  return {
      type : NOTIFY_SET_ICON,
      notifyIcon : bool,
  }
}

export const setLikeIcon = (bool) => {
  return {
      type : LIKE_SET_ICON,
      likeIcon : bool,
  }
}

//action consts
//Notify Icons check
export const notifyIconRepeat = (token) => {
  return (dispatch) => {
      //한번하고
      getNotifyFn(token, dispatch);
      //10초마다 하기
      getNotifyRepeat = setInterval(()=>{
          getNotifyFn(token, dispatch);
      }, 10000);
  }
}

export const clearNotifyIconRepeat = (token) => {
  return (dispatch) => {
      clearInterval(getNotifyRepeat);
  }
}

//ext
function getNotifyFn(token, dispatch) {
  const header = {
      headers : {
          'x-access-token' : token
      }
  }
  axios.post(domain + '/api/feed/getOneNotify', {}, header)
  .then((res) => {
      if(res.data.status === "NOTIFY_GET_FAILED"){
          // alert("ERROR\n"+res.data.message);
          dispatch(setNotifyIcon(false));
      }else if(res.data.status === "NOTIFY_GET_SUCCESSED"){
          dispatch(setNotifyIcon(res.data.notify && !res.data.notify.confirmed ? true : false));
      }
  }).catch((error) => {
      // alert("ERROR\n"+error.message);
      dispatch(setNotifyIcon(false));
  });
}

