import React from 'react';
import TextField from "@mui/material/TextField";
import {FormControl, Grid, InputLabel, Select} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from "date-fns/locale";
import LoadingButtonCom from "./LoadingButton";
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {setTrayectoria} from "../../Features/Profile/ProfileSlice";
import MenuItem from "@mui/material/MenuItem";

const AddTrayectoria = (props) => {
    const dispatch = useDispatch();
    const {Title, StartPeriod, EndPeriod, Description,Tipo} = useSelector(state => state.Profile);

    return(
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField fullWidth
                               id="outlined-basic"
                               value={Title}
                               label="Titulo del acontecimientos"
                               variant="outlined" onChange={(e)=>{
                                    dispatch(setTrayectoria({
                                        action:'setTitle',
                                        Title: e.target.value
                                    }))
                               }
                    }/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               id="outlined-basic"
                               value={Description}
                               label="Descripción del acontecimientos"
                               variant="outlined" onChange={(e)=>{
                                    dispatch(setTrayectoria({
                                        action:'setDescription',
                                        Description: e.target.value
                                    }))
                               }
                    }/>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fecha de inicio"
                            value={StartPeriod}
                            onChange={(newValue) => {
                                const date = new Date(newValue);
                                date.setDate(date.getDate()+1);
                                dispatch(setTrayectoria({
                                    action:'setStart',
                                    StartPeriod:  moment(date).format("YYYY-MM-DD")
                                }))
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item  xs={12} md={6} lg={6}>
                    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fecha de finalización"
                            value={EndPeriod}
                            onChange={(newValue) => {
                                const date = new Date(newValue);
                                date.setDate(date.getDate()+1);
                                dispatch(setTrayectoria({
                                    action:'setEnd',
                                    EndPeriod: moment(date).format("YYYY-MM-DD")
                                }))
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="Trayectoria">Tipo</InputLabel>
                        <Select
                            labelId="Trayectoria"
                            id="Trayectoria"
                            value={Tipo}
                            label="Tipo"
                            onChange={(e)=>{
                                dispatch(setTrayectoria({
                                    action:'setTipo',
                                    Tipo: e.target.value
                                }))
                            }}
                        >
                            <MenuItem value={"Logro"}>Logro</MenuItem>
                            <MenuItem value={"Estudio"}>Estudio</MenuItem>
                            <MenuItem value={"Otro"}>Otro</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButtonCom text="Añadir" funargs={{Title,StartPeriod,EndPeriod,Description,Tipo}}
                                      fun={props.trayectoriahandler}/>
                </Grid>
            </Grid>

        </>
    )
}
export default AddTrayectoria;