import axios from 'axios';
import { domain } from '../config';

//@params: path, obj, fn(success), fn(fail), token
const axiosRequest = (path, obj, success, fail, token) => {
  let header, post;

  if(token){
    const header = {
      headers: {
        'x-access-token': token
      }
    }
    post = axios.post(domain + path, obj, header);
  } else {
    post = axios.post(domain + path, obj);
  }
  post
  .then((res) => {
    if(res.data.status === "FAIL"){
      if(fail) fail();
    }else if(res.data.status === "SUCCESS"){ 
      if(success) success();
    }
    }).catch((error) => {
      alert("ERROR\n" + error.message);
    });
}

export default axiosRequest;