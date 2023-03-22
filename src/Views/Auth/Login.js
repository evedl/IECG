import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setErrors } from '../../Features/Alert/AlertSlice'
import axios from "axios";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import {setUserData,setUrlAvatar, setNombre, setApellidos} from "../../Features/Users/UsersSlice";
import {GetSelf} from "../../Service/UserService";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.guanajuato.gob.mx">
                Gobierno del estado de Guanajuato
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [Email,SetEmail]=React.useState()
    const [Password,SetPassword]=React.useState()
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

    const LoginData=()=>{
        let data = JSON.stringify({
            "Email": Email,
            "Password": Password
        });

        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL+'/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then((response) => {
                localStorage.setItem('GTO',response.data.token)
                const TokenDecode = jwtDecode(response.data.token)
                dispatch(setUserData({CurrentRol:TokenDecode.Rol,UserID:TokenDecode.id}))
                GetSelf().then((response)=>{
                    dispatch(setUrlAvatar({
                        UrlAvatar:response.data.UrlAvatar
                    }))
                    dispatch(setNombre({
                        Nombre:response.data.Nombre
                    }))
                    dispatch(setApellidos({
                        Apellidos:response.data.Apellidos
                    }))
                }).catch((error)=>{
                })
                navigate('/home')
            })
            .catch((error) => {
                SetEmailError(true)
                SetPasswordError(true)
                if(error.response.status){
                    dispatch(setErrors({
                        errors: [{
                            msg: "Correo o contraseña incorrectos"
                        }],
                        status: 2
                    }))
                }else{
                    dispatch(setErrors({
                        errors: [{
                            msg: error.response.data.msg
                        }],
                        status: 2
                    }))
                }
            });

    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '92vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/collection/2337150/1000x900)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Inicio de sesión
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                error={EmailError}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e)=>{
                                    SetEmail(e.target.value.toLowerCase())
                                    SetEmailError(false)
                                }}

                            />
                            <TextField
                                error={PasswordError}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e)=>{
                                    SetPassword(e.target.value)
                                    SetPasswordError(false)
                                }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={()=>{LoginData()}}
                            >
                                Iniciar sesión
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/password" variant="body2">
                                        ¿Olvídaste tu contraseña?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/singup" variant="body2">
                                        {"¿No tienes una cuenta? Crea una"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}