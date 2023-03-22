import axios from 'axios';

const Eliminar= (id) => {
  let config = {
    method: 'delete',
    url: process.env.REACT_APP_API_URL+'/publication/delete/'+id,
    headers: { 
      'Authorization': 'Bearer '+localStorage.getItem('GTO'), //token
    }
  }

  return axios(config)
}

export default Eliminar