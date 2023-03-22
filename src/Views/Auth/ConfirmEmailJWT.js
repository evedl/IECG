import React from 'react';
import {SendJWTemail} from "../../Service/ConfirmService";
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Button from "@mui/material/Button";

function ConfirmEmailJWT() {
    const navigate = useNavigate();
    let { token } = useParams();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    React.useEffect(() => {
        SendJWTemail(token).then(()=>{
            setIsSuccess(true)
            setIsLoading(false)
        }).catch(()=>{
            setIsError(true)
            setIsLoading(false)
        })
    }, [token]);
    return(
        <div style={{marginTop:22}}>
            {isLoading && <div>
                <Typography variant="h5" textAlign="center">
                    Estamos Validando tu correo eletronico
                </Typography>
                <Box sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <CircularProgress />
                </Box>
            </div>}
            {isSuccess && <div>
                <Typography variant="h5" textAlign="center">
                    Validacion exitosa
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <CheckIcon style={{fontSize:100, color:"#0ed518"}} />
                    <Typography variant="h6" textAlign="center">
                        Tu correo electronico ha sido validado correctamente.
                        Ya puedes iniciar sesion.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={()=>navigate("/login")}>
                        Iniciar Sesion
                    </Button>
                </Box>


            </div>}

            {isError && <div>
                <Typography variant="h5" textAlign="center">
                    Validacion fallida
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div>
                        <CloseIcon style={{fontSize:100, color:"#c51313"}} />
                        <PriorityHighIcon style={{fontSize:100, color:"#c51313"}} />
                    </div>
                </Box>
                <Typography variant="h6" textAlign="center">
                    Reintantalo nuevamente o contactanos para ayudarte.
                </Typography>
            </div>}
        </div>
    )
}

export default ConfirmEmailJWT;