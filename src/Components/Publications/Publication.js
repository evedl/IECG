import React from "react";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setErrors} from "../../Features/Alert/AlertSlice.js";
import {setActualizar} from "../../Features/Publication/PublicationSlice.js";
import Eliminar from "../../Service/DeletePublication.js";
import './Publication.css';
import { CardActionArea, CardMedia } from "@mui/material";
import moment from "moment";
import jwtDecode from "jwt-decode";
import swal from "sweetalert"
import SinImagen from '../../img/iecg.png'
import {getRoles} from '../../Service/RolesService.js'
import { useEffect } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const getRol = ()=>{
	var token = localStorage.getItem('GTO')
	var decode = jwtDecode(token)
	return decode
}

const Publication = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch()
  	const Publications = useSelector((state) => state.publication.Publications)
	const [roles, setRoles] = React.useState([])

	useEffect(()=>{
		getRoles().then(res=>{
			setRoles(res.data)
		}).catch(err=>{
		})
	},[])

	const EliminarPubli = (id) => {
		swal({ 
			title: "Eliminar", 
			text:"¿Estas seguro de que deseas eliminar este archivo?", 
			icon:"warning", 
			buttons: ["No", "Si"] 
			}).then(respuesta=>{ 
			if(respuesta){ 
				swal({text: "El archivo se ha borrado con exito", 
				icon: "success",timer:"2000"})   
				
				Eliminar(id)
				.then(function (response) {
					dispatch(setErrors({
						errors: [{msg: "Publicación eliminada"}],
						status: 2
					}))	
					dispatch(setActualizar())				
				})
				.catch(function (error) {
					dispatch(setErrors({
						errors: [{msg: "Error al eliminar la publicación"}],
						status: 2
					}))	
				});
			} 	
		})
	}

	const noImagen = (PublicationItem) => {
		if(PublicationItem.Urls.length !== 0){
			return PublicationItem.Urls[0]
		}else{
			return SinImagen
		}
	}

	const PublicacionVacia = () => {
		if(Publications.length === 0 && getRol().Rol !== 0){
			return(
				<div style={{ margin: '0 auto', textAlign: 'center' }}>
					<Typography variant="h3" mt={10} sx={{ fontWeight: 'bold' }}>
						No hay publicaciones
					</Typography>
					<Typography mt={3}>
						Para crear una publicacion, haz click en el boton "Crear publicacion"
					</Typography>
					<img src="https://i.imgur.com/lGPsMkN.png" width={300} alt="logo" />
				</div>
			)
		}
		else if(Publications.length === 0){
			return(
				<div style={{ margin: '0 auto', textAlign: 'center' }}>
					<Typography variant="h3" mt={10} sx={{ fontWeight: 'bold' }}>
						No hay publicaciones
					</Typography>
					<img src="https://i.imgur.com/lGPsMkN.png" width={300} alt="logo" />
				</div>
			)
		}
	}

	const Visibilidad = (Visible) => {
		if (getRol().Rol !== 0) {
			if(Visible.Visible){
				return (<VisibilityIcon />)
			}else{
				return (<VisibilityOffIcon />)
			}
		}
	}

	const Publication = () => {
			return(
				Publications.map((PublicationItem, index) => (
					<Grid key={index} sx={{padding:2}} item xs={12} md={6} lg={6}>
						<Card>
								  <CardActionArea onClick={()=>{navigate('/vermas/'+PublicationItem._id)}}>
										<CardMedia
											component="img"
											height="330"
											image={noImagen(PublicationItem)}
											alt="Sin imagen"
										/>
										<CardContent style={{ minHeight:155}}>
								<Typography gutterBottom variant="h5" component="div">
								  {PublicationItem.Title}
								</Typography>
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
								  {moment(PublicationItem.Date).format('D/MMMM/YYYY')}
								</Typography>
								<Visibilidad Visible = {PublicationItem.Visible}  />
								{roles.map((rol, index)=>{
									if(rol.Numero === PublicationItem.Categoria){
										return(
											<Typography sx={{ mb: 1.5 }} color="text.secondary">
												{rol.Nombre}
											</Typography>
										)
									}
									return null
								})}
								<Typography variant="body2" component="p">
								</Typography>
								<Typography className="descripcion" variant="body2" color="text.secondary">
								  {PublicationItem.Description}
								</Typography>
							  </CardContent>		  
									</CardActionArea>
									<CardActions disableSpacing>
							{(PublicationItem.Categoria === getRol().Rol || getRol().Rol === 50) && ( <>
							<Button size="small" startIcon={<EditIcon />} onClick={()=>{navigate('/update/'+PublicationItem._id)}}>Editar</Button>
							<Button size="small" color="error" startIcon={<DeleteIcon />} onClick={()=>EliminarPubli(PublicationItem._id)}>Borrar</Button>
							 </>)}
							<Button size="small" style={{ marginLeft: "auto" }} onClick={()=>{navigate('/vermas/'+PublicationItem._id)}} >Ver más...</Button>
						  </CardActions>	
							</Card>
					</Grid>
				  ))
			)
		}


	moment.locale('es', {
		months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
	})

  return(
    <>
		{PublicacionVacia()}
    	{Publication()}
    </>
  )
}
export default Publication;