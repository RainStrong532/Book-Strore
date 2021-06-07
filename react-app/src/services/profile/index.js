import axios from 'axios';
import * as URLS from '../url';

const createProfile = (data, token) =>{
    return new Promise((resolve, reject) =>
    {
        axios.post(URLS.PROFILE_URL, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    }
    )
}

export {
    createProfile
}