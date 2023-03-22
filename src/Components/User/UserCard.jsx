    import React from 'react';
    import {Box, Container, Divider, Typography} from "@mui/material";
    import Card from "@mui/material/Card";
    import Avatar from "@mui/material/Avatar";
    import {LocationOn} from "@mui/icons-material";
    import Chip from "@mui/material/Chip";
    import {blue} from "@mui/material/colors";
    import Grid from "@mui/material/Grid";
    import TrayectoriaCard from "../Trayectoria/TrayectoriaCard";
    import Button from "@mui/material/Button";
    import {useNavigate} from "react-router-dom";
    import FacebookIcon from '@mui/icons-material/Facebook';
    import Link from "@mui/material/Link";
    import SchoolIcon from '@mui/icons-material/School';
    import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
    import RecommendIcon from '@mui/icons-material/Recommend';

    const UserCard = (props) => {
        const [trayectorias, setTrayectorias] = React.useState([]);
        const [logros, setLogros] = React.useState([]);
        const [estudio, setEstudio] = React.useState([]);
        const [otros, setOtros] = React.useState([]);
        const [URL,setURL] = React.useState(props.user.Social.Facebook);

        const navigate = useNavigate();
        let event=props.user.Trayectoria.length-1

        React.useEffect(() => {
            if(props.user.Social.Facebook){
                if(!props.user.Social.Facebook.includes("https://")){
                    setURL('https://'+props.user.Social.Facebook)
                }
            }
            props.user.Trayectoria.map((trayectoria)=> {
                if(trayectoria.Tipo === "Estudio") {
                    return setEstudio(estado => [...estado, trayectoria])
                }
                if(trayectoria.Tipo === "Logro") {
                    return setLogros(estado => [...estado, trayectoria])
                }
                if(trayectoria.Tipo === "Otro") {
                    return setOtros(estado => [...estado, trayectoria])
                }
                return {};
            })
            if(!props.fulltrayectoria) {
                if(props.user.Trayectoria.length===0){
                    return;
                }
                setTrayectorias([props.user.Trayectoria[event]])
            }
        },[event, props])

      return(
        <div>
            <Card variant="outlined">
                <div>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '1rem'}}
                    >
                        <Avatar variant="circular" src={props.user.UrlAvatar? props.user.UrlAvatar:"avatar1.jpg"} sx={{ width: 100, height: 100, marginTop:2 }} />
                    <Typography variant="h6" textAlign="center">
                        {props.user.Nombre} {props.user.Apellidos}
                    </Typography>
                    <Typography variant="subtitle1" textAlign="center">
                        {props.user.Email}
                    </Typography>
                    <Typography variant="subtitle1" textAlign="center">
                        {props.user.Telefono}
                    </Typography>
                    <Typography textAlign="center" variant="body2" color="text.secondary">
                        <LocationOn sx={{color: blue[500]}} /> {props.user.Ubicacion}
                    </Typography>
                     {props.user.Social.Facebook && (
                         <Link href={URL}>
                             <FacebookIcon/>
                         </Link>
                        )}
                    </Box>

                    <Divider/>


                </div>

                <Container>
                    <Grid  container spacing={3}>
                        {props.user.Etiquetas.map((tag,index) =>{
                            return (
                                <Grid key={index} item xs={3} sx={{ margin: '0 auto' }} >
                                    <Chip
                                        color="success"
                                        style={{marginTop:10,marginBottom:10}}
                                        label={tag}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
                    {props.fulltrayectoria&& (
                        <>
                            <Divider>Estudios</Divider>
                            {estudio.map((trayectoria)=>(
                                <TrayectoriaCard key={trayectoria._id}
                                                 title={trayectoria.Title}
                                                 start={trayectoria.StartPeriod}
                                                 end={trayectoria.EndPeriod}
                                                 description={trayectoria.Description}
                                                 card={true}
                                                 icon={<SchoolIcon/>}/>
                            ))}
                            <Divider>Logros</Divider>
                            {logros.map((trayectoria)=>(
                                <TrayectoriaCard key={trayectoria._id}
                                                 title={trayectoria.Title}
                                                 start={trayectoria.StartPeriod}
                                                 end={trayectoria.EndPeriod}
                                                 description={trayectoria.Description}
                                                 card={true}
                                                 icon={<EmojiEventsIcon/>}/>
                            ))}
                            <Divider>Otros</Divider>
                            {otros.map((trayectoria)=>(
                                <TrayectoriaCard key={trayectoria._id}
                                                 title={trayectoria.Title}
                                                 start={trayectoria.StartPeriod}
                                                 end={trayectoria.EndPeriod}
                                                 description={trayectoria.Description}
                                                 card={true}
                                                 icon={<RecommendIcon/>}/>
                            ))}
                        </>
                    )}
                <Divider/>
                {trayectorias.map((trayectoria)=>(
                    <TrayectoriaCard key={trayectoria._id}
                                     title={trayectoria.Title}
                                     start={trayectoria.StartPeriod}
                                     end={trayectoria.EndPeriod}
                                     description={trayectoria.Description}
                                     card={true}/>
                ))}

                {!props.fulltrayectoria && (
                    <Button onClick={()=>{
                        navigate("/acervo/usuario/"+props.user.id)
                    }} fullWidth>Ver más</Button>
                )}

            </Card>
        </div>
      )
    }


    export default UserCard;