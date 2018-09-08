import { domain } from '../config';
import axios from 'axios';

//save feed
export default (obj, token) => {
    const header = {
        headers : {
            'x-access-token' : token
        }
    }

    // API REQUEST
    axios.post(domain + '/api/feed/saveFeeds', obj, header)
    .then((res) => {
        if(res.data.status === "FEED_SAVE_FAILED"){
            alert("ERROR\n"+res.data.message);
        }else if(res.data.status === "FEED_SAVE_SUCCESSED"){
            // alert(res.data.status)
        }
    }).catch((error) => {
        // FAILED
        alert("ERROR\n"+res.data.message);
    });
}


