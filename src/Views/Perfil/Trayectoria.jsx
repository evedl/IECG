import React from 'react'
import Typography from "@mui/material/Typography";
import AddTrayectoria from "../../Components/Trayectoria/AddTrayectoria";
import {Grid} from "@mui/material";
import TrayectoriaCard from "../../Components/Trayectoria/TrayectoriaCard";
import {useSelector} from "react-redux";
import {AddTrayectoriaPUT} from "../../Service/UserService";
import {useDispatch} from "react-redux";
import {setUpdate} from "../../Features/Profile/ProfileSlice";
import {RemoveTrayectoria} from "../../Service/UserService";
import { setErrors, setText } from '../../Features/Alert/AlertSlice';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RecommendIcon from '@mui/icons-material/Recommend';

const Trayectoria = () => {
    const dispatch = useDispatch();
    const {Trayectoria} = useSelector(state => state.users.CurrentUser);
    const [Trayectorias, setTrayectorias] = React.useState([]);

    React.useEffect(()=>{
        let sort = []
        Trayectoria.forEach(trayectoria => {
            sort.push(trayectoria)
        })
        sort.sort((a,b)=>{
            return new Date(b.StartPeriod) - new Date(a.StartPeriod)
        })

        setTrayectorias(sort)
    },[Trayectoria])


    const SendTrayectoria = (data) => {
        AddTrayectoriaPUT(data).then(() => {
            dispatch(setUpdate())
            dispatch(setText({
                msg: 'Acontecimiento agregado con exito',
                status: 1
            }))
        }).catch(err => {
            dispatch(setErrors({
                errors: err.response.data.errors,
                status: 2
            }))
        })
    }

    const RemoveTrayectoriaSend = (id) => {
        RemoveTrayectoria(id).then(() => {
            dispatch(setUpdate())
            dispatch(setText({
                msg: 'Acontecimiento eliminado con exito',
                status: 1
            }))
        }).catch(err => {
            dispatch(setErrors({
                errors: err.response.data.errors,
                status: 2
            }))
        })
    }

    return(
        <>
            <Typography textAlign="center" variant="h5">
                Añade los acontecimientos importantes de tu carrera
            </Typography>
            <Grid style={{paddingTop: 22}} container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                    <AddTrayectoria trayectoriahandler={SendTrayectoria} />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    {Trayectorias.map((trayectoria) => (
                        <TrayectoriaCard key={trayectoria._id}
                                         id={trayectoria._id}
                                         deleteHandler={RemoveTrayectoriaSend}
                                         style={{paddingTop:10, paddingBottom:10}}
                                         title={trayectoria.Title}
                                         start={trayectoria.StartPeriod}
                                         end={trayectoria.EndPeriod}
                                         description={trayectoria.Description}
                                         card={true}
                                         icon={
                                              (trayectoria.Tipo === 'Estudio' && <SchoolIcon/>)
                                            || (trayectoria.Tipo === 'Logro' && <EmojiEventsIcon/>)
                                             || (trayectoria.Tipo === 'Otro' && <RecommendIcon/>)
                                         }
                        />
                    ))}
                </Grid>
            </Grid>
        </>
    )
}

export default Trayectoria;