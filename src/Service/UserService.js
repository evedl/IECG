import axios from "axios";

const GetallUsers = () => {
    let config = {
        method: 'get',
        url: process.env.REACT_APP_API_URL+'/users/all',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO')
        }
    };

   return axios(config)
}

const AddbasicData = (UserData)=>{
    let data = JSON.stringify({
        "Ubicacion": UserData.Municipio,
        "Telefono": UserData.Telefono,
        "Comunidad": UserData.Comunidad,
        "Facebook": UserData.Facebook,
    });

    let config = {
        method: 'put',
        url: process.env.REACT_APP_API_URL+'/users/add/basicinfo',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO'),
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
}

const AddTags = (Tags)=>{
    let data = JSON.stringify({
        "tags": Tags
    });

    let config = {
        method: 'put',
        url: process.env.REACT_APP_API_URL+'/users/add/tags',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO'),
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
}

const AddTrayectoriaPUT = (Trayectoria)=> {
    let data = JSON.stringify({
        "Title": Trayectoria.Title,
        "Description": Trayectoria.Description,
        "StartPeriod": Trayectoria.StartPeriod,
        "EndPeriod": Trayectoria.EndPeriod,
        "Tipo": Trayectoria.Tipo
    });

    let config = {
        method: 'put',
        url: process.env.REACT_APP_API_URL+'/users/add/trayectoria',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO'),
            'Content-Type': 'application/json'
        },
        data : data
    };

   return axios(config)
}

const GetSelf= ()=>{
    let config = {
        method: 'get',
        url: process.env.REACT_APP_API_URL+'/users/self',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO')
        }
    };

    return axios(config)
}

const RemoveTrayectoria = (id)=>{
    let config = {
        method: 'delete',
        url: process.env.REACT_APP_API_URL+'/users/delete/trayectoria/'+id,
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO')
        }
    };

    return axios(config)
}

const GetUserComplete = ()=>{
    let config = {
        method: 'get',
        url: process.env.REACT_APP_API_URL+'/users/all/complete',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO')
        }
    };

    return axios(config)
}

const GetUserCompleteById = (id)=>{
    let config = {
        method: 'get',
        url: process.env.REACT_APP_API_URL+'/users/complete/'+id,
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('GTO')
        }
    };

    return axios(config)
}

export {GetUserCompleteById,GetallUsers,AddbasicData,AddTags,AddTrayectoriaPUT,GetSelf,RemoveTrayectoria,GetUserComplete}
