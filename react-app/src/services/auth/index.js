import axios from 'axios';
import * as URLS from '../url';

const login = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(URLS.LOGIN_URL, data)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            }
            )
    })
}

const signup = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(URLS.SIGNUP_URL, data)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            }
            )
    })
}

const getUserInfo = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(URLS.USER_URL,
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                resolve(response.data)
            }
            )
            .catch(err => reject(err));
    })
}

export {
    login,
    getUserInfo,
    signup
}