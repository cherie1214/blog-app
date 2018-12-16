import { 
  ARTICLE_GETTING,
  ARTICLE_GET_SUCCESS,
  ARTICLE_GET_FAILURE, 

  ARTICLE_INIT,

} from './ActionTypes';

import axios from 'axios';
import { domain } from '../config';
// import { setNotifyIcon } from './Feed'


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
export function requestSaveArticle(oriArticle, token){
    return (dispatch) => {
        dispatch(articleGetting());

        const header = {
            headers : {
                'x-access-token' : token
            }
        }

        let article = Object.assign({},oriArticle);
        article.bgStyle = {};
        article.bgStyle.backgroundColor = article.bg.color.value || article.bgStyle.backgroundColor || null;
        article.bgStyle.photoUrl = article.bg.photo || (article.bgStyle ? article.bgStyle.photoUrl : null) || null;
        if(!article.bgStyle.photoUrl){
            article.bgStyle.backgroundColor = article.bgStyle.backgroundColor || "#6B5ED1";
        }else{
            article.bgStyle.backgroundColor = null;
        }
        article.weather = article.weather && article.weather.name ? article.weather.name : null;

        let feed = Object.assign({},article)   

        // API REQUEST
        return axios.post(domain + '/api/article/write', article, header)
        .then((res) => {
            if(res.data.status === "ARTICLE_SAVE_FAILED"){
                // alert("ERROR\n"+res.data.message);
                dispatch(articleGetFailure());
            }else if(res.data.status === "ARTICLE_SAVE_SUCCESSED" || res.data.status === "ARTICLE_UPDATE_SUCCESSED"){
                console.log(res.data.status)
                // alert("저장되었습니다.")
                dispatch(articleGetSuccess(res.data._id));  
                // setNotifyIcon(true);
            }
        }).catch((error) => {
            // FAILED
            dispatch(articleGetFailure());
        });
    }
}

