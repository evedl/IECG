import { useState } from 'react'
import { Dialog, DialogTitle, MenuItem, ListItemIcon, DialogContent, DialogContentText, DialogActions, Button, Grid } from '@mui/material'
import { PhotoCamera, Delete } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import {  uploadAvatar, deleteAvatar } from '../../Service/AvatarService'
import { setText, setErrors } from '../../Features/Alert/AlertSlice'
import Avatar from 'react-avatar-edit'

const AvatarUpdate = () => {
  const [avatar] = useState()
  const [newAvatar, setNewAvatar] = useState()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const changeAvatar = () => {
    uploadAvatar(newAvatar, '480x512')
    .then(() => {
      handleClose()
      setNewAvatar()
      dispatch(setText({
        msg: "Avatar actualizado correctamente",
        status: 1
      }))
      window.location.reload()
    })
    .catch(error => {
      dispatch(setErrors({
        errors: [{
          msg: error.response.data.msg,
        }],
        status: 2
      }))
    })
  }

  const onCrop = async (imagen) => {
    const blob = await fetch(imagen).then(res => res.blob())
    setNewAvatar(blob)
  }
  
  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <PhotoCamera />
        </ListItemIcon>
        Subir foto de perfil
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen
      >
        <DialogTitle id="alert-dialog-title">
          {"Subir foto de perfil"}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <div style={{ margin: '40px auto' }}>
              <Grid item md={6} lg={12}>
                <Avatar
                  onCrop={(e) => onCrop(e)}
                  width={480}
                  height={512}
                  cropRadius={240}
                  src={avatar}
                />
                <img src={newAvatar} alt="" />
              </Grid>
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='success' onClick={changeAvatar} autoFocus>Confirmar</Button>
          <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const AvatarDelete = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    deleteAvatar()
    .then(() => {
      handleClose()
      dispatch(setText({
        msg: "Avatar eliminado correctamente",
        status: 1
      }))
      window.location.reload()
    })
    .catch(error => {
      dispatch(setErrors({
        errors: [{
          msg: error.response.data.msg,
        }],
        status: 2
      }))
    })
  }

  return(
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Eliminar foto de perfil
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Eliminar foto de perfil"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de eliminar tu foto de perfil? Esta acción es irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' color="error" onClick={handleDelete} autoFocus>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </>
  )

}

export { AvatarUpdate, AvatarDelete }