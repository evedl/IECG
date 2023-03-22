import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, Button, Card, CardContent, CardActions } from "@mui/material"
import CardPerfilComplete from "../../Components/Trayectoria/CardPerfilComplete"
import { GetSelf } from "../../Service/UserService"
import { getRoles } from "../../Service/RolesService"
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Buttons = () => {
  const CurrentRol = useSelector(state => state.users.CurrentRol)
  const [etiquetas, setEtiquetas] = useState(false)
  const [trayectoria, setTrayectoria] = useState(false)
  const [ubicacion, setUbicacion] = useState(false)
  const navigate = useNavigate()
  const [Roles, setRoles] = useState([])
  
  useEffect(() => {
    getRoles().then(res => {
      setRoles(res.data)
    })
  }, [])

  useEffect(() => {
    GetSelf()
        .then(res => {
          setEtiquetas(res.data.isCompleteProfile.Etiquetas)
          setTrayectoria(res.data.isCompleteProfile.Trayectoria)
          setUbicacion(res.data.isCompleteProfile.Ubicacion)
        })
        .catch(err => {
        })
  }, [])

  return(
      <>
        <Grid container spacing={2}>
          {(etiquetas === false || trayectoria === false || ubicacion === false) && CurrentRol === 0 &&(
              <Grid item xs={12}>
                <CardPerfilComplete />
              </Grid>
          )}
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h4">
              Inicio
            </Typography>
          </Grid>
          {( 0 !== CurrentRol && (
              <>
                <Grid item xs={12} md={6}>
                  <Button fullWidth variant='contained' color='success' onClick={() => {navigate('/crear')}}>Crear publicaciones</Button>
                </Grid>
              </>
          ))}
          {CurrentRol === 50 && (
              <>
            <Grid item xs={12} md={6}>
              <Button fullWidth variant='contained' color='error' onClick={() => {navigate('/publicaciones')}}>Ver publicaciones</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth variant='contained' color='secondary' onClick={() => {navigate('/usuarios')}}>Lista de Usuarios</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth variant='contained' color='primary' onClick={() => {navigate('/acervo')}}>Acervo</Button>
            </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Typography variant="h4" textAlign="center">Publicaciones</Typography>
            <Card sx={{ background: '#eeeee4' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <strong>Publicaciones visibles</strong>
              </CardContent>
              <CardActions>
                <Button fullWidth variant='contained' onClick={() => navigate('/publicaciones/visible')}>Publicaciones visibles <Visibility sx={{ marginLeft: 1 }}/></Button>
              </CardActions>
            </Card>
          </Grid>
          {Roles.map((rol, index) => {
            return (
                <Grid key={index} item xs={4}>
                  <Card sx={{ background: '#eeeee4' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <strong>{rol.Nombre}</strong>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant='contained' onClick={() => navigate('/publicaciones/categoria/visible/'+rol.Numero)}>visibles <Visibility sx={{ marginLeft: 1 }}/></Button>
                      {((rol.Numero === CurrentRol) || (CurrentRol === 50))  && (
                        <Button fullWidth variant='contained' onClick={() => navigate('/publicaciones/categoria/'+rol.Numero)}>Todas <VisibilityOff sx={{ marginLeft: 1 }}/></Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
            )})}
        </Grid>
      </>
  )
}

export default Buttons