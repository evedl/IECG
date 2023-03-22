import axios from "axios";
const SendResetEmail = (Email)=>{
    let data = JSON.stringify({
        "Email": Email
    });

    let config = {
        method: 'post',
        url: process.env.REACT_APP_API_URL+'/auth/reset/password',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
}

const ResetPasswordService = (Token,Password,PasswordConfirmation)=>{
    let data = JSON.stringify({
        "Token": Token,
        "Password": Password,
        "PasswordConfirmation": PasswordConfirmation
    });

    let config = {
        method: 'put',
        url: process.env.REACT_APP_API_URL+'/auth/reset/password',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

   return axios(config)
}

const SetRol=(id,rol)=>{
    let data = JSON.stringify({
        "id": id,
        "Role": rol
    });

    let config = {
        method: 'put',
        url: process.env.REACT_APP_API_URL+'/auth/setrole',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO'),
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
}

export {SendResetEmail,ResetPasswordService,SetRol}