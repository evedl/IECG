import axios from 'axios';

const GetPublications = ()=>{
   return  axios.get(process.env.REACT_APP_API_URL+'/publication/read', {
      headers:{
         'Authorization': 'Bearer '+localStorage.getItem('GTO'), //token
      }
   })
}

const GetPublicationsVisible = ()=>{
   return  axios.get(process.env.REACT_APP_API_URL+'/publication/visible/read')
}

const GetIdPublication = (id) =>{
   return axios.get(process.env.REACT_APP_API_URL+'/publication/read/'+id, {
      headers:{
         'Authorization': 'Bearer '+localStorage.getItem('GTO'), //token
      }
   })
} 

const GetIdPublicationVisible = (id) =>{
   return axios.get(process.env.REACT_APP_API_URL+'/publication/read/public/'+id,)
} 

const GetPublicationByCategoria = (categoria) =>{
   return axios.get(process.env.REACT_APP_API_URL+'/publication/read/categoria/'+categoria, {
      headers:{
         'Authorization': 'Bearer '+localStorage.getItem('GTO'), //token
      }
   })
} 

const GetPublicationByCategoriaVisible = (categoria) =>{
   return axios.get(process.env.REACT_APP_API_URL+'/publication/read/visible/categoria/'+categoria, {
      headers:{
         'Authorization': 'Bearer '+localStorage.getItem('GTO'), //token
      }
   })
} 

export {
   GetPublications, 
   GetPublicationsVisible, 
   GetIdPublication, 
   GetIdPublicationVisible, 
   GetPublicationByCategoria, 
   GetPublicationByCategoriaVisible
} 