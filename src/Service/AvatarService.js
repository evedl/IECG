import axios from "axios";

const uploadAvatar = (avatar, dimensiones) => {
  const data = new FormData()
  data.append('avatar', avatar)
  data.append('Dimensiones', dimensiones)

  let config = {
    method: 'post',
    url: process.env.REACT_APP_API_URL+'/users/upload/avatar',
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem('GTO')
    },
    data : data
  };

  return axios(config)
}

const deleteAvatar = () => {
  let config = {
    method: 'delete',
    url: process.env.REACT_APP_API_URL+'/users/delete/avatar',
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem('GTO')
    }
  };

  return axios(config)
}

export { uploadAvatar, deleteAvatar }