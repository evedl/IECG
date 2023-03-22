import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function SimplePaper(props) {
    const [PasswordLe,SetPasswordLe]=React.useState(false)
    const [PasswordMayuscula,SetPasswordMayuscula]=React.useState(false)
    const [PasswordMinuscula,SetPasswordMinuscula]=React.useState(false)
    const [PasswordCaracter,SetPasswordCaracter]=React.useState(false)
    const [PasswordNumero,SetPasswordNumero]=React.useState(false)

    React.useEffect(()=>{
        try{
            if(props.password.length>=8){
                SetPasswordLe(true)
            }else {
                SetPasswordLe(false)
            }
            if(props.password.search("([A-Z])")!==-1){
                SetPasswordMayuscula(true)
            }else{
                SetPasswordMayuscula(false)
            }
            if(props.password.search("([a-z])")!==-1){
                SetPasswordMinuscula(true)
            }else{
                SetPasswordMinuscula(false)
            }
            // eslint-disable-next-line
            SetPasswordCaracter(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(props.password))
            if(props.password.search("([0-9])")!==-1){
                SetPasswordNumero(true)
            }else{
                SetPasswordNumero(false)
            }
        }catch (e) {
        }

    },[props])
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    height: 220,
                },
            }}
        >
            <Paper elevation={3} >
                <Typography style={{margin:2}} variant="h6">
                    La contraseña debe contener
                </Typography>
                <Grid style={{margin:2}} container spacing={1}>

                    <Grid item xs={10}>
                        Al menos 8 caracteres
                    </Grid>
                    <Grid item xs={2}>
                        {PasswordLe ? (<CheckIcon/>):(<CloseIcon/>)}
                    </Grid>

                    <Grid item xs={10}>
                        Al menos una letra  mayúscula
                    </Grid>
                    <Grid item xs={2}>
                        {PasswordMayuscula ? (<CheckIcon/>):(<CloseIcon/>)}
                    </Grid>

                    <Grid item xs={10}>
                        Al menos una letra minúscula
                    </Grid>
                    <Grid item xs={2}>
                        {PasswordMinuscula ? (<CheckIcon/>):(<CloseIcon/>)}
                    </Grid>

                    <Grid item xs={10}>
                        Al menos un carácter especial (./#)
                    </Grid>
                    <Grid item xs={2}>
                        {PasswordCaracter ? (<CheckIcon/>):(<CloseIcon/>)}
                    </Grid>

                    <Grid item xs={10}>
                        Al menos un número
                    </Grid>
                    <Grid item xs={2}>
                        {PasswordNumero ? (<CheckIcon/>):(<CloseIcon/>)}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}