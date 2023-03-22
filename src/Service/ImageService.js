import axios from "axios"

const uploadImage = (image, dimensiones, id ) => {
  let data = new FormData()
  data.append("img", image)
  data.append('Dimensiones', dimensiones)

  let config = {
    method: "post",
    url: process.env.REACT_APP_API_URL + "/img/upload/" + id,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("GTO"), //token
      "Content-Type": "multipart/form-data",
    },
    data: data,
  }

  return axios(config);
}

const eliminarImagen = (id, idImagen) => {
  let config = {
    method: 'delete',
    url: process.env.REACT_APP_API_URL+'/img/delete/'+id+'/'+idImagen,
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem('GTO'), //token
    }
  }

  return axios(config)
}

export { uploadImage, eliminarImagen }