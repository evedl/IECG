import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {GetPublicationByCategoria} from "../../Service/GetPublication"
import Typography from "@mui/material/Typography";
import {setPublications} from "../../Features/Publication/PublicationSlice"
import Grid from "@mui/material/Grid";
import PublicationComponent from "../../Components/Publications/Publication"
import { Container} from "@mui/material";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import PaginationPublications from "../../Components/Publications/PaginationPublications";
import { Crear } from "../../Components/Publications/Rueda";
import jwtDecode from "jwt-decode";

const getRol = ()=>{
	var token = localStorage.getItem('GTO')
	var decode = jwtDecode(token)
	return decode
}


const Category =() => {
    const dispatch = useDispatch()
    const Actualizar = useSelector((state) => state.publication.actualizar)
    let { index } = useParams()
    let { categoria } = useParams()

    const route = () => {
        return ("publicacionesbycategoria/"+categoria)
    }

    useEffect(()=>{
      GetPublicationByCategoria(categoria).then(res=>{
            if(index){
                dispatch(setPublications({
                    Publications:res.data,
                    index:parseInt(index)
                }))
            }else {
                dispatch(setPublications({
                    Publications:res.data,
                    index:1
                }))
            }
        }).catch((err)=>{
        })
    },[dispatch,Actualizar, categoria, index])


    const Auth = () => {
        if(getRol().Rol === parseInt(categoria) || getRol().Rol === 50){
            return(
                <div style={{ textAlign: 'center' }}>
            <Container style={{paddingTop: 6}}>
                <Typography variant="h5">
                    Publicaciones
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                    </Grid>
                    <Grid item xs={2}>
                        <Crear />
                    </Grid>
                    <PublicationComponent/>
                    <PaginationPublications index={parseInt(1)} path={route()}/>
                </Grid>
            </Container>
        </div>
            )
        }else{
            return(
                <div style={{ margin: '0 auto', textAlign: 'center' }}>
                        <Typography variant="h3" mt={10} sx={{ fontWeight: 'bold' }}>
                            No tienes permisos para ver esta seccion
                        </Typography>
                        <img src="https://i.imgur.com/lGPsMkN.png" width={300} alt="logo" />
                    </div>
            )
        }
    }
    return(
        <>
        {Auth()}
        </>
    )

}

export default Category;