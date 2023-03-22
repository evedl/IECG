import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {SendResetEmail} from "../../Service/AuthService";
import {useDispatch} from "react-redux";
import {setText} from "../../Features/Alert/AlertSlice";

const RequestResetPassword = ()=>{
    const [email, setEmail] = React.useState("");
    const [DisabledEmail, setDisabledEmail] = React.useState(false);
    const dispatch = useDispatch();

    const sendEmail = ()=>{
        setDisabledEmail(true);
        SendResetEmail(email).then((resp)=>{
            dispatch(setText({
                msg:resp.data.msg,
                state:1
            }));
        }).catch((err)=>{
            setDisabledEmail(false);
            if(err.response.status===400){
               return  dispatch(setText({
                    msg:"Correo no valido",
                    state:2
                }));
            }
            dispatch(setText({
                msg:err.response.data.msg,
                state:2
            }));

        })
    }

    return(
        <Container style={{marginTop:22}} maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid item xs={12} square="true">
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                            </Box>
                        </Grid>

                            <Typography textAlign="center" variant="h6" gutterBottom>
                            Restablecer contraseña
                        </Typography>
                        <Typography>
                            Enviaremos un correo para restablecer la contraseña
                            Revisa tu bandeja de entrada y sigue las instrucciones.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} justifyItems="center">
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            disabled={DisabledEmail}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            disabled={DisabledEmail}
                            onClick={()=>{
                                sendEmail();
                            }
                        }>
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
        </Container>
    )
}

export default RequestResetPassword;