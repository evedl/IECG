import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {GetPublicationsVisible} from "../Service/GetPublication";
import Typography from "@mui/material/Typography";
import {setPublications} from "../Features/Publication/PublicationSlice"
import Grid from "@mui/material/Grid";
import PublicationComponent from "../Components/Publications/Publication"
import { Container } from "@mui/material";
import {useSelector} from "react-redux";
import PaginationPublications from "../Components/Publications/PaginationPublications";
import {useParams} from "react-router-dom";

const VWpublicationVisible  =() => {
    let {index} = useParams();

    const dispatch = useDispatch()
    const Actualizar = useSelector((state) => state.publication.actualizar)

    useEffect(()=>{
        GetPublicationsVisible().then(res=>{
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
    },[dispatch,Actualizar,index])

    return(
        <div>
            <Container style={{paddingTop: 6}}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography align="center" variant="h5">
                        Publicaciones Visibles
                    </Typography>
                </Grid>
                <PublicationComponent/>
                <PaginationPublications index={parseInt(index)} path="publicaciones/visible"/>
            </Grid>
            </Container>
        </div>
    )

}

export default VWpublicationVisible;