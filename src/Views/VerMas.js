import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GetIdPublication, GetIdPublicationVisible } from '../Service/GetPublication'
import moment from "moment";
import ImgSlider from "../Components/Publications/ImgSlider";
import jwt_decode from "jwt-decode";
import { Regresar } from '../Components/Publications/Rueda';
import { getRoles } from '../Service/RolesService';

const PublicationCompleta = () => {
  const [titulo, settitulo] = useState("")
  const [date, setdate] = useState("")
  const [descripcion, setdescripcion] = useState("")
  const [slides, seturls] = useState([])
  const [Categoria, setCategoria] = useState("")
  let {id} = useParams();
  const [roles, setRoles] = React.useState([])

  useEffect(()=>{
		getRoles().then(res=>{
			setRoles(res.data)
		}).catch(err=>{
			console.log(err)
		})
	},[])

  useEffect(()=>{
    if(getRol().Rol === 0){
      GetIdPublicationVisible(id).then(res => {
        settitulo(res.data.Title)
        setdate(res.data.Date)
        setdescripcion(res.data.Description)
        setCategoria(res.data.Categoria)
        seturls(res.data.Urls)
      }).catch(err => {
      }
      )
    }
    else{
      GetIdPublication(id).then(res => {
        settitulo(res.data.Title)
        setdate(res.data.Date)
        setdescripcion(res.data.Description)
        setCategoria(res.data.Categoria)
        seturls(res.data.Urls)
      }).catch((err) => {
      })
    }
  },[id])

  const getRol = () => {
    return   jwt_decode(localStorage.getItem("GTO")); 
  }

  const PublicacionVacia = () => {
			return(
				<div style={{ margin: '0 auto', textAlign: 'center' }}>
					<Typography variant="h3" mt={10} sx={{ fontWeight: 'bold' }}>
						No tienes permisos para ver esta publicación
					</Typography>
					<img src="https://i.imgur.com/lGPsMkN.png" width={300} alt="logo" />
				</div>
			)
		}

  moment.locale('es', {
		months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
	})

  return(
    <div style={{marginTop: 30, marginLeft: '15%', marginRight: '15%'}}>
      {!titulo && (<PublicacionVacia/>)}
      {titulo && (
        <>
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            sx={{ padding: 2 }}
          >
            <Grid>
              <Regresar />
            </Grid>
            <Grid item xs={12} align='center'>
              <ImgSlider Urls={slides}/>
            </Grid>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              align='center'
              display= 'flex'
            >
              {titulo}
              <Typography marginLeft='auto' marginRight='0' >
              {moment(date).format('D/MMMM/YYYY')}
            </Typography>
            </Typography>
            {roles.map((rol, index)=>{
									if(rol.Numero === Categoria){
										return(
											<Typography key={index} sx={{ mb: 1.5 }} color="text.secondary">
												{rol.Nombre}
											</Typography>
										)
									}
									return null
							})}
            <Typography
              variant="body"
              component="div"
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {descripcion}
            </Typography>     
          </Grid>
        </>
      )}
    </div>
  )
}
export default PublicationCompleta;