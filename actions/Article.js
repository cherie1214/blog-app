import { 
  ARTICLE_GETTING,
  ARTICLE_GET_SUCCESS,
  ARTICLE_GET_FAILURE, 

  ARTICLE_INIT,

} from './ActionTypes';

import axios from 'axios';
import { AsyncStorage } from 'react-native';


//action creators
export function articleGetting() {
    return {
        type: ARTICLE_GETTING,
    };
  }
  
  export function articleGetSuccess(_id) {
    return {
        type: ARTICLE_GET_SUCCESS,
        _id
    };
  }
  
  export function articleGetFailure() {
    return {
        type: ARTICLE_GET_FAILURE
    };
  }

  export function articleInit() {
    return {
        type : ARTICLE_INIT
    }
}

//save article
export function requestSaveArticle(article, token){
    return (dispatch) => {
        dispatch(articleGetting());

        const header = {
            headers : {
                'x-access-token' : token
            }
        }

        // API REQUEST
        return axios.post('http://localhost:8000/api/article/write', article, header)
        .then((res) => {
            if(res.data.status === "ARTICLE_SAVE_FAILED"){
                // alert("ERROR\n"+res.data.message);
                dispatch(articleGetFailure());
            }else if(res.data.status === "ARTICLE_SAVE_SUCCESSED" || res.data.status === "ARTICLE_UPDATE_SUCCESSED"){
                console.log(res.data.status)
                // alert("저장되었습니다.")
                dispatch(articleGetSuccess(res.data._id));
                console.log(JSON.stringify(res.data,0,2))
            }
        }).catch((error) => {
            // FAILED
            dispatch(articleGetFailure());
        });
    }
}

