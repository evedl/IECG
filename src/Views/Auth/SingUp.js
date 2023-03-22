import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useDispatch} from "react-redux";
import {setText} from "../../Features/Alert/AlertSlice";
import { setConfirm,setUserId } from '../../Features/Confirmation/ConfirmSlice';
import {useNavigate} from "react-router-dom";
import PasswordTest from '../../Components/PasswordTest'
const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [Nombre,SetNombre]=React.useState()
    const [Apellidos,SetApellidos]=React.useState()
    const [Email,SetEmail]=React.useState()
    const [Password,SetPassword]=React.useState()
    const [NombreError,SetNombreError]=React.useState()
    const [ApellidosError,SetApellidosError]=React.useState()
    const [EmailError,SetEmailError]=React.useState()
    const [PasswordError,SetPasswordError]=React.useState()

    React.useEffect(()=>{
        const tokenExists = ()=>{
            if(localStorage.getItem('GTO')){
                navigate('/home')
            }
        }
        tokenExists()
    },[navigate])


    const SingUpData = ()=>{
        let data = JSON.stringify({
            "Nombre": Nombre,
            "Apellidos": Apellidos,
            "Email": Email,
            "Password": Password
        });

        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL+'/users/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then((response) => {
                dispatch(setUserId({
                    userId: response.data.id
                }))
                dispatch(setConfirm({
                    status: 1
                  }))
                dispatch(setText({
                    msg:response.data.msg,
                    state:1
                }))
            })
            .catch((error) => {
                if(error.response.data.errors){
                    dispatch(setText({
                        msg:"Errores en los datos",
                        state:2
                    }))
                    for(let i in error.response.data.errors){
                        if(error.response.data.errors[i].param==="Email"){
                            SetEmailError(true)
                        }
                        if(error.response.data.errors[i].param==="Nombre"){
                            SetNombreError(true)
                        }
                        if(error.response.data.errors[i].param==="Apellidos"){
                            SetApellidosError(true)
                        }
                        if(error.response.data.errors[i].param==="Password"){
                            SetPasswordError(true)
                        }
                    }
                }else{
                    dispatch(setText({
                        msg:error.response.data.msg,
                        state:2
                    }))
                }
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Crea una nueva cuenta
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={NombreError}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                    onChange={(e)=>{
                                        SetNombre(e.target.value)
                                        SetNombreError(false)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={ApellidosError}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellido"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e)=>{
                                        SetApellidos(e.target.value)
                                        SetApellidosError(false)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={EmailError}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electrónico"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e)=>{
                                        SetEmail(e.target.value)
                                        SetEmailError(false)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={PasswordError}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e)=>{
                                        SetPassword(e.target.value)
                                        SetPasswordError(false)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordTest password={Password}/>
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={()=>{SingUpData()}}
                        >
                            Crear cuenta
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="src/Views/Auth/SingUp#" variant="body2" onClick={()=>{navigate('/login')}}>
                                    ¿Ya tienes una cuenta? Inicia sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}