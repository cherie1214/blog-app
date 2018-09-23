import { 
  NOTIFY_SET_ICON,
  LIKE_SET_ICON,
} from './ActionTypes'
import axios from 'axios';
import { domain } from '../config';

const getLikeRepeat = null;

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
//Like Icons check
export const likeIconRepeat = (token) => {
  return (dispatch) => {
      if(getLikeRepeat){
          clearInterval(getLikeRepeat);
      }
      //한번하고
      getLikeFn(token, dispatch);
      //10초마다 하기
      getLikeRepeat = setInterval(()=>{
          getLikeFn(token, dispatch);
      }, 3000);
  }
}

export const clearLikeIconRepeat = (token) => {
  return (dispatch) => {
      clearInterval(getLikeRepeat);
  }
}

//ext
function getLikeFn(token, dispatch) {
  const header = {
      headers : {
          'x-access-token' : token
      }
  }
  axios.post(domain + '/api/feed/getOneLike', {}, header)
  .then((res) => {
      if(res.data.status === "LIKE_GET_FAILED"){
          // alert("ERROR\n"+res.data.message);
          dispatch(setLikeIcon(false));
      }else if(res.data.status === "LIKE_GET_SUCCESSED"){
        //   alert(res.data.like.confirmed)
          dispatch(setLikeIcon(res.data.like && !res.data.like.confirmed ? true : false));
      }
  }).catch((error) => {
      // alert("ERROR\n"+error.message);
      dispatch(setLikeIcon(false));
  });
}
