export default function callApi(method, url, data, token) {
    let request = {
        method: method
    }
    if (data) {
        request.body = JSON.stringify(data);
        request.headers = {
            'Content-Type': 'application/json'
        }
    }
    if(token){
        request.headers= {
            ...request.headers,
            'Authorization': 'Bearer ' + token
        }
    }
    return new Promise((resolve, reject) => {
        fetch(
            url,
            request
        )
        .then(res=>{
            console.log("fetch api: ",res);
            return res.json();
        })
        .then(res => {
            console.log("json: ", res);
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    })
}