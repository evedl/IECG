import React from 'react'
import {Card, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import BadgeIcon from '@mui/icons-material/Badge';
import {useNavigate} from "react-router-dom";


const CardPerfilComplete = () => {
    const navigate = useNavigate();
    return(
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={11}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Control de identidad
                            </Typography>
                        </Grid>
                        <Grid item xs={1} style={{color:"#03c7b6"}}>
                            <BadgeIcon/>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" component="div" textAlign="Center">
                        ¿Quieres añadirte al directorio del Instituto Estatal de la Cultura?
                    </Typography>
                    <Typography textAlign="center" sx={{ mb: 1.5 }} color="text.secondary">
                        Da clic en botón para completar tu perfil y añadir tu trayectoria.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button fullWidth
                            variant="contained"
                            size="small"
                            onClick={()=>{
                                navigate("/identidad/perfil")
                            }}
                    >
                        Continuar
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default CardPerfilComplete