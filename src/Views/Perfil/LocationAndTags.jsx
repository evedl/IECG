import { useState, useEffect } from 'react';
import Municipios from './Municipios.json'
import { Typography, TextField, Button } from "@mui/material";
import AutoCompleteComp from "../../Components/Trayectoria/AutoComplete";
import SingleChip from "../../Components/Trayectoria/SingleChip";
import {Box, Grid} from "@mui/material";
import Tags from "./Tags";
import LoadingButtonCom from "../../Components/Trayectoria/LoadingButton";
import {useDispatch, useSelector} from "react-redux";
import {setBasicData, setStep} from "../../Features/Profile/ProfileSlice";
import {AddbasicData,AddTags} from "../../Service/UserService";
import {setIsLoading} from "../../Features/Feedback/FeedBackSlice";
import { setErrors, setText } from '../../Features/Alert/AlertSlice';

const LocationAndTags = () => {
    const {Etiquetas,Municipio,Facebook,Telefono,Comunidad} = useSelector(state => state.Profile);
    const [newTag, setNewTag] = useState([]);
    const [addNewTag, setAddNewTag] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        setNewTag(Tags)
    }, [])

    const HandleSeletecMunicipio = (e) => {
        dispatch(setBasicData({
            action:"setMunicipio",
            Municipio: e.target.value
        }))
    }
    const HandleSeletecComunidad = (e) => {
        dispatch(setBasicData({
            action:"setComunidad",
            Comunidad: e.target.value
        }))
    }
    const HandleSeletecTelefono = (e) => {
        dispatch(setBasicData({
            action:"Telefono",
            Telefono: e.target.value
        }))
    }
    const HandleSeletecFacebook = (e) => {
        dispatch(setBasicData({
            action:"Facebook",
            Facebook: e.target.value
        }))
    }

    const HandleSeletecTag = (e) => {
        dispatch(setBasicData({
            action:"setEtiquetas",
            Etiqueta: e
        }))
    }

    const HandleDeleteTag = (e) => {
        dispatch(setBasicData({
            action:"deleteEtiqueta",
            Etiqueta: e
        }))
    }

    const addNewTags = () => {
        if(addNewTag.length > 0){
        setNewTag(tags => [...tags, {label: addNewTag,chipstate:true}])
        setAddNewTag("")
        HandleSeletecTag(addNewTag)
        }else{
            dispatch(setErrors({
                errors: [{
                    msg: "No puedes agregar una etiqueta vacia"
                }],
                status: 2
            }))
        }
    }


    //PELIGRO
    const ChangeStep = (step) => {
        dispatch(setIsLoading({
            isLoading:true
        }))
        AddbasicData({Municipio, Facebook, Telefono, Comunidad}).then(res => {
            AddTags(Etiquetas).then(res => {
                dispatch(setIsLoading({
                    isLoading:false
                }))
                dispatch(setText({
                    msg: 'Guardado con exito',
                    status: 1
                }))
                dispatch(setStep({
                    step
                }))
            }).catch(err => {
                let errMsg
                if(err.response.data.errors){
                    errMsg = err.response.data.errors
                }else{
                    errMsg = [{
                        msg: 'Error al guardar',
                    }]
                }
                dispatch(setErrors({
                    errors: errMsg,
                    status: 2
                }))
                dispatch(setIsLoading({
                    isLoading:false
                }))
            })
        }).catch((err) => {
            let errMsg
            if(err.response.data.errors){
                errMsg = err.response.data.errors
            }else{
                errMsg = [{
                    msg: 'Error al guardar',
                }]
            }
            dispatch(setErrors({
                errors: errMsg,
                status: 2
            }))
            dispatch(setIsLoading({
                isLoading:false
            }))
        })

    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" textAlign="center">
                        Medios de contacto
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                    <TextField fullWidth id="Teléfono" label="Telefono" variant="outlined" onChange={(e)=>{HandleSeletecTelefono(e)}}/>
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                    <TextField fullWidth id="Facebook" label="Facebook" variant="outlined" onChange={(e)=>{HandleSeletecFacebook(e)}}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" textAlign="center">
                        Añade una ubicación a tu perfil
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <AutoCompleteComp handler={HandleSeletecMunicipio} options={Municipios}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth id="Comunidad" label="Comunidad" variant="outlined"  helperText="En caso de que corresponda" onChange={(e)=>{HandleSeletecComunidad(e)}} />
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{paddingTop:20,paddingBottom:20}} variant="h5" textAlign="center">
                        Añade tus etiquetas que describan tu trabajo
                    </Typography>
                </Grid>
                {newTag.map((tag) => {
                    return(
                        <Grid item xs={6} sm={6} md={3} key={tag.label}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="flex-center"
                                sx={{ flexGrow: 1}}
                            >
                                <SingleChip handlerDelete={HandleDeleteTag} handlerSelect={HandleSeletecTag} label={tag.label} chipState={tag.chipstate}/>
                            </Box>
                        </Grid>
                        )
                    })}
            </Grid>
            <Grid container spacing={2} sx={{ margin: '20px auto' }}>
                <Grid item xs={6}>
                    <TextField fullWidth id="newTag" label="Añade una nueva etiqueta" variant="outlined" onChange={(e)=>{setAddNewTag(e.target.value)}} value={addNewTag}/>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="primary" onClick={()=>{addNewTags()}}>
                        Añadir
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} >
                <LoadingButtonCom text="Guardar" fun={ChangeStep} funargs={2}/>
            </Grid>
        </>
    )
}

export default LocationAndTags;