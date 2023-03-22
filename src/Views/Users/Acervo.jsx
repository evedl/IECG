import React from 'react';
import Grid from "@mui/material/Grid";
import {Container, Typography} from "@mui/material";
import {GetUserComplete} from "../../Service/UserService";
import UserCard from "../../Components/User/UserCard";

const Acervo = () => {
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        GetUserComplete().then((res)=>{
            setUsers(res.data)
        }).catch((err)=>{
        })
    },[])
    return (
    <div>
        <Container>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Typography variant="h5">
                        Acervo de usuarios
                  </Typography>
              </Grid>
                  {users.map((user)=>(
                      <Grid key={user.id}  item xs={12} md={6} lg={6}>
                          <UserCard user={user} fulltrayectoria={false}/>
                      </Grid>
                  ))}
          </Grid>

        </Container>
    </div>
  );
}

export default Acervo;