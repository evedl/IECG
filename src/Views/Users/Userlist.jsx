import React from 'react';
import {GetallUsers} from "../../Service/UserService";
import {setAllUsers} from "../../Features/Users/UsersSlice";
import {useDispatch, useSelector} from "react-redux";
import UserTable from "../../Components/User/UserTable";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Userlist = () => {
    const Acutalizar = useSelector(state => state.users.Actualizar);
    const dispatch = useDispatch();
    React.useEffect(()=>{
        GetallUsers().then((response)=>{
            dispatch(setAllUsers({
                Users:response.data
            }));
        }).catch((err)=>{
        })
    },[dispatch,Acutalizar])

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography textAlign="center"  variant="h4" mt={2} sx={{ fontWeight: 'bold' }}>
                        Lista de usuarios
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginLeft:22,marginRight:22}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <UserTable/>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default Userlist;