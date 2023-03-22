import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PasswordTest from "../../Components/PasswordTest"
import { useDispatch } from "react-redux";
import {setText} from "../../Features/Alert/AlertSlice";
import {ResetPasswordService} from "../../Service/AuthService"
import {useNavigate, useParams} from "react-router-dom";
import {Alert, AlertTitle} from "@mui/material";
const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { token } = useParams();
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [ErrorSolictiud, setErrorSolicitud] = React.useState(false);

    const ChangePassword = () => {
        setDisabled(true)
        ResetPasswordService(token, password, passwordConfirmation)
            .then(res => {
                dispatch(setText({
                    msg: res.data.msg,
                    state:1
                }))
                navigate("/login")

            })
            .catch(err => {
                setDisabled(false)
                if(err.response.status === 400){
                    dispatch(setText({
                        msg: err.response.data.msg,
                        state:2
                    }))
                }
                err.response.data.errors.map(error => {
                    if(error.param){
                        setErrorSolicitud(true)
                    }
                    if(error.param==="Password"){
                        setPasswordError(true)
                        dispatch(setText({
                            msg: error.msg,
                            state:2
                        }))
                    }
                    return ""
                })
            })
    }

    return (
        <div>
            <Container maxWidth="xs">
                <Grid container spacing={1}>
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
                    <Grid item xs={12}>
                        <Typography variant="h5" textAlign="center" >
                            Restablecer contraseña
                        </Typography>
                    </Grid>
                    {ErrorSolictiud &&
                        <Grid item xs={12}>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Esta solicitud ya no es valida — <strong>Solicita un nuevo correo </strong>
                            </Alert>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            margin="normal"
                            fullWidth
                            required
                            id="password"
                            label="Nueva contraseña"
                            name="password"
                            autoComplete="password"
                            autoFocus
                            disabled={disabled}
                            error={passwordError}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            margin="normal"
                            fullWidth
                            required
                            id="Confirmarpassword"
                            label="Confirmar contraseña"
                            name="password"
                            autoComplete="password"
                            disabled={disabled}
                            error={passwordError}
                            onChange={(e)=>setPasswordConfirmation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={disabled}
                            fullWidth onClick={()=>{
                            ChangePassword()
                        }}>
                            Restablecer contraseña
                        </Button>
                    </Grid>
                    <PasswordTest password={password}/>
                </Grid>
            </Container>
        </div>
    )
}

export default ResetPassword;