import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";
import ButtonCambiarRol from "./ButtonCambiarRol";
import { getRoles } from '../../Service/RolesService';

export default function UserTable() {
    const Users = useSelector(state => state.users.Users);
    const [Roles, setRoles] = React.useState([])

    React.useEffect(() => {
        getRoles()
        .then(res => {
                setRoles(roles => [...roles, {Nombre: "AdminRoot", Numero: 50}])
                setRoles(roles => [...roles, {Nombre: "Usuario", Numero: 0}])
                res.data.map(key => {
                    return setRoles(roles => [...roles,{
                        Nombre: 'Admin' + key.Nombre,
                        Numero: key.Numero
                    }])
                })           
        })
        .catch(err => {
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID del usuario</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Rol</TableCell>
                        <TableCell align="right">Correo Verificado</TableCell>
                        <TableCell align="right">Cambiar rol</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Users.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="right">{user.Nombre+' '+user.Apellidos}</TableCell>
                            <TableCell align="right">{user.Email}</TableCell>
                            <TableCell align="right">{
                                Roles.map(key => {
                                    if(key.Numero === user.Role) {
                                        return key.Nombre.split(/(?=[A-Z])/).join(" ")
                                    }
                                    return ""
                                })
                            }</TableCell>
                            <TableCell align="right">{user.EmailVerified ? 'Si' : 'No'}</TableCell>
                            <TableCell align="right">
                                <ButtonCambiarRol roles={Roles} id={user.id}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
