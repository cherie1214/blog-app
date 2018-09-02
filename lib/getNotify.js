import { domain } from '../config';
import axios from 'axios';

//save notification
export default (obj, token) => {
    const header = {
        headers : {
            'x-access-token' : token
        }
    }

    // API REQUEST
    return axios.post(domain + '/api/notification/saveNotifications', obj, header)
    .then((res) => {
        if(res.data.status === "NOTIFICATION_SAVE_FAILED"){
            alert("ERROR\n"+res.data.message);
        }else if(res.data.status === "NOTIFICATION_SAVE_SUCCESSED"){
            // alert(res.data.status)
        }
    }).catch((error) => {
        // FAILED
        alert("ERROR\n"+res.data.message);
    });
}


