const axios = require('axios');

const UpdatePublication = (id,titulo,descripcion) => {
  let data = JSON.stringify({
      "Title": titulo,
      "Description": descripcion
    });
    let config = {
      method: 'put',
      url: process.env.REACT_APP_API_URL+'/publication/update/'+id, 
      headers: { 
        'Authorization': 'Bearer '+localStorage.getItem('GTO'), //token
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)

return axios(config)
}

const UpdatePublicationVisible = (id, visible) => {
  let data = JSON.stringify({
      "Visible": visible
    });
    let config = {
      method: 'put',
      url: process.env.REACT_APP_API_URL+'/publication/update/visible/'+id, 
      headers: { 
        'Authorization': 'Bearer '+localStorage.getItem('GTO'), //token
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)

return axios(config)
}

export {UpdatePublication, UpdatePublicationVisible}