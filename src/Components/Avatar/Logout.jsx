import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

function LogoutAvatar() {
  let ReduxAvatar = useSelector(state => state.users.UrlAvatar)
  let ReduxNombre = useSelector(state => state.users.Nombre)
  let ReduxApellidos = useSelector(state => state.users.Apellidos)
  const [UrlAvatar, setUrlavatar] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellidos] = useState('')

  useEffect(()=>{
    if(localStorage.getItem("UrlAvatar")){
      setUrlavatar(localStorage.getItem("UrlAvatar"))
    }else{
      setUrlavatar(ReduxAvatar)
    }
    if(localStorage.getItem("Nombre")){
      setNombre(localStorage.getItem("Nombre"))
    }else{
      setNombre(ReduxNombre)
    }
    if(localStorage.getItem("Apellidos")){
      setApellidos(localStorage.getItem("Apellidos"))
    }else{
      setApellidos(ReduxApellidos)
    }
  },[ReduxAvatar, ReduxNombre, ReduxApellidos])

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SignOut = () => {
    localStorage.removeItem("GTO");
    navigate("/");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Cuenta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={UrlAvatar? UrlAvatar:''} sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>{navigate('/perfilcompleto')}}>
          <Avatar src={UrlAvatar? UrlAvatar:''} /> {nombre} {apellido}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {SignOut()}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default LogoutAvatar