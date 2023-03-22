import * as React from 'react';
import { Button, Menu, MenuItem, Divider } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {SetRol} from '../../Service/AuthService'
import {setActualizarUsuarios} from "../../Features/Users/UsersSlice";
import {useDispatch} from "react-redux";
import { setErrors, setText } from '../../Features/Alert/AlertSlice';
import { DialogCreate, DialogDelete } from './DialogRol'

export default function ButtonCambiarRol(props) {
    const dispatch = useDispatch()

    return (
        <PopupState variant="popover" popupId="popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                        Rol
                    </Button>
                    <Menu
                    {...bindMenu(popupState)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        { props.roles.map(key => {
                           return <MenuItem
                               key={key.Nombre}
                               onClick={()=>{
                               popupState.close()
                               SetRol(props.id, key.Numero).then(()=>{
                                   dispatch(setActualizarUsuarios())
                                   dispatch(setText({
                                        msg:"Rol cambiado",
                                        status: 1
                                   }))
                               }).catch((error)=>{
                                    dispatch(setErrors({
                                        erros: [{
                                            msg: error.response.data.errors
                                        }],
                                        status: 2
                                }))
                               })
                           }}>
                                {key.Nombre.split(/(?=[A-Z])/).join(" ")}
                            </MenuItem>
                        })}
                        <Divider />
                        <DialogCreate />
                        <DialogDelete />
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
