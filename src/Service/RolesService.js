import axios from "axios"

const getRoles = () => {
  return  axios.get(process.env.REACT_APP_API_URL+'/auth/get/roles', {
    headers:{
      'Authorization': 'Bearer '+ localStorage.getItem('GTO')
    }
 })
}

const createRole = (role) => {
   let data = JSON.stringify({
      Nombre: role
   })

   let config = {
      method: 'post',
      url: process.env.REACT_APP_API_URL+'/auth/create/role',
      headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('GTO'),
        'Content-Type': 'application/json'
      },
      data: data
    }

   return axios(config)
}

const deleteRole = (id) => {
  let config = {
    method: 'delete',
    url: process.env.REACT_APP_API_URL+'/auth/delete/role/'+id,
    headers: {
      'Authorization': 'Bearer '+ localStorage.getItem('GTO')
    }
  }
  
  return axios(config)
}

export { getRoles, createRole, deleteRole }