import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Grid, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import TextField from '@mui/material/TextField'
import CreateIcon from '@mui/icons-material/Create'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { setNext, setImg } from '../../Features/CreateNext/CreateSlice'
import { setErrors } from '../../Features/Alert/AlertSlice'
import { useNavigate } from "react-router-dom";
import { getRoles } from '../../Service/RolesService'

function InputCreate() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [category, setCategory] = useState([])
  const [newCategory, setNewCategory] = useState('')

  var token = localStorage.getItem('GTO')
  var decode = jwtDecode(token)

  useEffect(() => {
    getRoles()
    .then((res) => {
      setCategory(res.data)
    })
    .catch((err) => {
    })
  }, [])
  

  const createAdmin = () => {
    if(decode.Rol === 50){
     return '/publication/create/admin'
    }else{
      return '/publication/create'
    }
  }

  const addPublication = () => {
    const data = JSON.stringify({
      "Title": title,
      "Description": description,
      "Categoria": newCategory,
    })

   let config = {
     method: 'post',
     url: process.env.REACT_APP_API_URL + createAdmin(),
     headers: { 
       'Authorization': 'Bearer ' + localStorage.getItem('GTO'), 
       'Content-Type': 'application/json'
     },
     data : data
   };
   axios(config)
   .then(function (response) {
      dispatch(setNext({
        status: 1
      }))
     dispatch(setImg({
      id: response.data._id
     }))
    }).catch(function(error) {
      dispatch(setErrors({
        errors: error.response.data.errors,
        status: 2
      }))
    });
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Crear publicación</h1>
      <Grid container spacing={2} sx={{ margin: '0 auto' }}>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CreateIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField fullWidth label="Ingresar título" variant="standard" onChange={(e) => {setTitle(e.target.value)}} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CreateIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField fullWidth multiline label="Ingresar descripción" variant="standard" onChange={(e) => {setDescription(e.target.value)}}/>
          </Box>
        </Grid>
        {decode.Rol === 50 && (
          <Grid item xs={12}>
            <h1 style={{ textAlign: 'center' }}>Elige una categoría</h1>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: 120 }}>
              <FormControl sx={{ minWidth: 300, margin: '0 auto' }}>
                <InputLabel>Categoría</InputLabel>
                  <Select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    {category.map((rol, index) => {
                      return (
                        <MenuItem key={index} value={rol.Numero}>{rol.Nombre}</MenuItem>
                      )
                    })}
                  </Select>
              </FormControl>
            </Box>
          </Grid>
        )}
      </Grid>
      <Button variant='contained' color='success' sx={{ mt: 4, float: 'right' }} onClick={addPublication}>Siguiente</Button>
      <Button variant='contained' sx={{ mt: 4 }} onClick={() => {navigate('/publicaciones')}}>Cancelar</Button>
    </div>
  );
}

export default InputCreate
