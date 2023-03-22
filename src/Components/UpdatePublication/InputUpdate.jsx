import { useState, useEffect } from 'react'
import { Box, Grid, Button, Container } from '@mui/material'
import TextField from '@mui/material/TextField'
import CreateIcon from '@mui/icons-material/Create'
import { useDispatch } from 'react-redux'
import { setNext } from '../../Features/CreateNext/CreateSlice'
import { setText } from '../../Features/Alert/AlertSlice'
import { useNavigate, useParams } from "react-router-dom";
import { GetIdPublication } from '../../Service/GetPublication'
import { UpdatePublication } from '../../Service/UpdatePublication'



function InputCreate() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  let {id} = useParams();

  useEffect(() => {
    GetIdPublication(id).then(res => {
      setTitle(res.data.Title.toString())
      setDescription(res.data.Description.toString())
    })
    .catch((err) => {
    })
  }, [id])

  const UpPublication = () => {
      UpdatePublication(id, Title, Description)
      .then((response) => {
        dispatch(setText({
          msg:"Se actualizo la publicacion",
          status: 1
        }))
        dispatch(setNext({
          status: 1
        }))
      })
      .catch((error) => {
      }); 
  }

  return (
    <Container fixed>
      <h1 style={{ textAlign: 'center' }}>Editar publicación</h1>
      <Grid container spacing={2} sx={{ margin: '0 auto' }}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <CreateIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField fullWidth label="Ingresar título" value={Title} variant="standard" onChange={(e) => {setTitle(e.target.value)}} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box sx={{ display: 'flex' }}>
            <CreateIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField fullWidth multiline label="Ingresar descripción" variant="standard" value={Description} onChange={(e) => {setDescription(e.target.value)}}/>
          </Box>
        </Grid>
      </Grid>
      <Button variant='contained' color='success' sx={{ mt: 4, float: 'right' }} onClick={UpPublication}>Siguiente</Button>
      <Button variant='contained' color='primary' sx={{ mt: 4 }} onClick={() => {navigate('/publicaciones')}}>Cancelar</Button>
    </Container>
  );
}

export default InputCreate
