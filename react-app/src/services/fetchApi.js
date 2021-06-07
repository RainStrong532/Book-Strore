export default function callApi(method, url, data, token) {
    return new Promise((resolve, reject) => {
        let request = {
            method: method
        }
        if (data) {
            if (data.image) {
                const formData = new FormData();
                fetch(data.image)
                    .then(res => res.blob())
                    .then(blob => {
                        const type = data.image.split(';')[0].split('/')[1];
                        formData.append("image", blob, new Date().toDateString() + '.' + type);
                        request.body = formData;
                        fetch(
                            url,
                            request
                        )
                            .then(res => {
                                return res.json();
                            })
                            .then(res => {
                                resolve(res);
                            })
                            .catch(err => {
                                reject(err);
                            })
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                request.body = JSON.stringify(data);
                request.headers = {
                    'Content-Type': 'application/json'
                }
            }
        }
        if (token) {
            request.headers = {
                ...request.headers,
                'Authorization': 'Bearer ' + token
            }
        }
        fetch(
            url,
            request
        )
            .then(res => {
                return res.json();
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}