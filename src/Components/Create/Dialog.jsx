import React, { useState } from 'react';
import { Button, Dialog,  DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Slide, Switch } from '@mui/material';
import { useSelector } from 'react-redux'
import { UpdatePublicationVisible } from '../../Service/UpdatePublication';

const Transition = React.forwardRef(function Transition(props, ref){
  return <Slide direction='up' ref={ref} {...props}/>
})
export default function AlertDialog(props) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const id = useSelector((state) => state.next.id)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setVisible(event.target.checked)
  };

  const renderVisible = () => {
    if(visible){
      return "visible para todos los usuarios"
    }
    else{
      return "visible solo para los administradores"
    }
  }

  const linealProgress = () => {
    if(loading){
      return <LinearProgress />
    }
    else{
      return null
    }
  }

  const buttonsDisabled = () => {
    if(disabled){
      return (
        <>
          <Button disabled onClick={handleClose}>Cancelar</Button>
          <Button disabled onClick={() => {
            setDisabled(true)
            setLoading(true)
            UpdatePublicationVisible(id, visible).then(() => {
              props.onClick()
            })
          }} autoFocus>
            Enviar
          </Button>
        </>
      )
    }
    else{
      return (
        <>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => {
            setDisabled(true)
            setLoading(true)
            UpdatePublicationVisible(id, visible).then(() => {
              props.onClick()
            })
          }} autoFocus>
            Enviar
          </Button>
        </>
      )
    }
  }



  return (
    <div>
      <Button variant='contained' color='success' sx={{ mt: 4, float: 'right' }} onClick={handleClickOpen}>Finalizar</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar publicación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La publicación será
            <Switch checked={visible} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}></Switch> {renderVisible()} 
            <br/>¿Estás seguro de continuar? Una vez que le des a "Enviar" no podrás cancelar esta acción.
            <br/> {linealProgress()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttonsDisabled()}
        </DialogActions>
      </Dialog>
    </div>
  );
}
