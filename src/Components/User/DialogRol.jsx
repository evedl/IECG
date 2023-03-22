import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, MenuItem, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, InputLabel, Select } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { createRole, deleteRole, getRoles } from '../../Service/RolesService'
import { setText, setErrors } from '../../Features/Alert/AlertSlice'

//////////////////////////////////////////////////// Dialog Create //////////////////////////////////////////////////////////////////////////

const DialogCreate = () => {
  const [open, setOpen] = useState(false)
  const [create, setCreate] = useState('')
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = () => {
    createRole(create)
    .then((res) => {
      window.location.reload()
      dispatch(setText({
        msg: 'Rol creado correctamente',
        status: 1
      }))
      handleClose()
    })
    .catch((err) => {
      dispatch(setErrors({
        errors: [{
          msg: err.response.data.msg,
        }],
        status: 2
      }))
    })
  }

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        Crear rol
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Crear rol</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ marginBottom: 2 }}>
              Escribe el rol que deseas crear, ten encuenta que una vez creado el rol no se puede editar.
            </DialogContentText>
            <TextField
              fullWidth
              id='outlined'
              label="Nombre del rol"
              onChange={(e) => {setCreate(e.target.value)}}
              onKeyDown = {(e) => {
                e.stopPropagation();
                }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
            <Button variant='contained' color='success' onClick={handleCreate}>Crear rol</Button>
          </DialogActions>
      </Dialog>
    </>
  )
}

///////////////////////////////////////////// Dialog delete /////////////////////////////////////////////////////////////////////////////////

const DialogDelete = () => {
  const [open, setOpen] = useState(false)
  const [rol, setRole] = useState([])
  const [newDelete, setNewDelete] = useState('')
  const [Confirmar, setConfirmar] = useState('warning')
  const dispatch = useDispatch()

  useEffect(() => {
    getRoles()
    .then(res => {
      setRole(res.data)
    })
    .catch(err => {
    })
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setConfirmar('warning')
    setOpen(false)
  }

  const handleDelete = () => {
    if(!newDelete){
      dispatch(setErrors({
        errors: [{
          msg: 'No se ha seleccionado ningun rol',
        }],
        status: 2
      }))
    }
    else if(newDelete) {
      setConfirmar('primary')
      deleteRole(newDelete).then(res => {
        window.location.reload()
        dispatch(setText({
          msg: 'Rol eliminado correctamente',
          status: 1
        }))
      }).catch(err => {
        dispatch(setErrors({
          errors: [{
            msg: err.response.data.msg,
          }],
          status: 2
        }))
      })
    }
  }

    return (
      <div>
        <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Eliminar rol
      </MenuItem>
      <Dialog
      open={open}
      onClose={handleClose}
      >
        <DialogTitle>Eliminar rol</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 2 }}>
            Selecciona el rol que quieres eliminar, recuerda que esta acción es irreversible y las publicaciones de esa categoría serán removidas.
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel>Categorías existentes</InputLabel>
            <Select value={newDelete} onChange={(e) => setNewDelete(e.target.value)}>
              {rol.map((rol, index) => {
                return (
                  <MenuItem key={index} value={rol.Numero}>{rol.Nombre}</MenuItem> 
                )
              })}
            </Select>
            <DialogContentText sx={{ margin: '20px 0 10px 0' }}>Para confirmar que quieres eliminar este rol escribe: 'Confirmar'</DialogContentText>
            <TextField
              color= {Confirmar}
              id='outlined'
              label='Confirmar'
              autoComplete='off'
              onChange={(e) => {if(e.target.value === 'Confirmar'){setConfirmar('success')}else{setConfirmar('warning')}}}
              onKeyDown = {(e) => {
                e.stopPropagation();
                }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
          {newDelete && Confirmar === 'success' &&(
          <Button variant='contained' color='success' onClick={handleDelete}>Eliminar rol</Button>
          )}
          {(!newDelete || Confirmar !== 'success') &&(
          <Button disabled variant='contained' color='success' onClick={handleDelete}>Eliminar rol</Button>
          )}
        </DialogActions>
      </Dialog>
      </>
      </div>
      )
  }


export { DialogCreate, DialogDelete }