import React from 'react'
import LocationAndTags from "./LocationAndTags";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useDispatch, useSelector} from 'react-redux'
import Trayectoria from "./Trayectoria";
import {GetSelf} from "../../Service/UserService";
import {setCurrentUser} from "../../Features/Users/UsersSlice";
import UploadAvatar from './Avatar';

const steps = [
    'Foto de perfil',
    'Ubicación y etiquetas',
    'Trayectoria',
];

const CompleteProfile = () =>{
    const dispatch = useDispatch();
    const {step, Update} = useSelector(state => state.Profile)

    React.useEffect(()=>{
        GetSelf().then(res => {
            dispatch(setCurrentUser({
                CurrentUser:res.data
            }))
        }).catch(err => {
        }
        )
    },[dispatch,Update])

    return(
        <>
            <Container style={{paddingTop:10}} fixed>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={step} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Grid container spacing={3} style={{paddingTop:20}}>
                    {step===0 &&
                        <>
                         <UploadAvatar />
                        </>
                    }
                    {step===1 &&
                        <Grid item xs={12}>
                            <LocationAndTags/>
                        </Grid>
                    }
                    {step===2 && <Grid item xs={12}>
                        <Trayectoria/>
                        </Grid>
                    }


                </Grid>
            </Container>
        </>
    )
}

export default CompleteProfile;