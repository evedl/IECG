import axios from 'axios';

const SendEmailConfirm = (id) => {
    let data = JSON.stringify({
        "id": id
    });

    let config = {
        method: 'put',
        url: process.env.REACT_APP_API_URL+'/auth/verify/email',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
}

const SendJWTemail = (token) => {
    let data = JSON.stringify({
        "Token": token
    });

    let config = {
        method: 'put',
        url: process.env.REACT_APP_API_URL+'/auth/verify/email/token',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
}

export {SendEmailConfirm, SendJWTemail};