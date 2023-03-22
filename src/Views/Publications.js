import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {GetPublications} from "../Service/GetPublication";
import Typography from "@mui/material/Typography";
import {setPublications} from "../Features/Publication/PublicationSlice"
import Grid from "@mui/material/Grid";
import PublicationComponent from "../Components/Publications/Publication"
import { Container} from "@mui/material";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import PaginationPublications from "../Components/Publications/PaginationPublications";
import { Crear } from '../Components/Publications/Rueda'


const VWpublication =() => {
    const dispatch = useDispatch()
    const Actualizar = useSelector((state) => state.publication.actualizar)
    let {index} = useParams();

    useEffect(()=>{
        GetPublications().then(res=>{
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
            console.log(err)
        })
    },[dispatch,Actualizar,index])

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
                    <PaginationPublications index={parseInt(index)} path="publicaciones"/>
                </Grid>
            </Container>
        </div>
    )

}

export default VWpublication;