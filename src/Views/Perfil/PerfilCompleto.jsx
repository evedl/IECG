import React from 'react'
import UserCard from "../../Components/User/UserCard";
import {GetUserCompleteById} from '../../Service/UserService';
import {useParams} from "react-router-dom";
import {Container} from "@mui/material";
const PerfilCompleto =()=>{
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    let {id} = useParams();
    React.useEffect(()=>{
        GetUserCompleteById(id).then((res)=>{
            setUser(res.data[0])
            setLoading(false)
        }).catch((err)=>{
        })
    },[id])
    return(
        <>
            <Container>
                <div style={{paddingTop:22}}>
                    {loading? '': <UserCard  user={user} fulltrayectoria={true}/>}
                </div>
            </Container>
        </>
    )
}
export default PerfilCompleto