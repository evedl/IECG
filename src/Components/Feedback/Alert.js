import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector,useDispatch } from 'react-redux'
import {setClose} from '../../Features/Alert/AlertSlice'
import { Slide } from '@mui/material';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const ErrrorAlert = (props) => {
      const dispatch = useDispatch()
      const [open, setOpen] = React.useState(false);

      React.useEffect(()=>{
          function change() {
              return new Promise(function(resolve, reject) {
                  setTimeout(resolve, 6000);
              }).then(function() {
                  setOpen(false)
                  dispatch(setClose())
              });
          }
          if(alert!==0){
              setOpen(true)
          }else{
              setOpen(false)
          }
          change().then(r => {})
      },[dispatch])

      const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
              return;
          }

          setOpen(false);
      };

      return(
          <>
              <div>
                      <Snackbar open={open} autoHideDuration={6000}  onClose={handleClose}
                                TransitionComponent={TransitionUp}
                                sx={{ height: (props.index*12+5+"%").toString() }}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}>
                          <Alert onClose={handleClose} severity="error" sx={{ width: 'auto' }}>
                              {props.error.msg}
                          </Alert>
                      </Snackbar>
                  </div>
          </>
      )

  }

export default function CustomizedSnackbars() {
    const alert = useSelector((state) => state.alert.status)
    const msg = useSelector((state) => state.alert.msg)
    const errors = useSelector((state) => state.alert.errors)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    React.useEffect(()=>{
        function change() {
            return new Promise(function(resolve, reject) {
                setTimeout(resolve, 6000);
            }).then(function() {
                setOpen(false)
                dispatch(setClose())
            });
        }
        if(alert!==0){
            setOpen(true)
        }else{
            setOpen(false)
        }
        change().then(r => {})
    },[alert,dispatch])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        dispatch(setClose())

    };

    const alertDialog = () => {
        if(alert === 1){
            return(
               <>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={TransitionUp}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        {msg}
                    </Alert>
                </Snackbar>
               </>
            )
        }
        else if(alert === 2){
            return(
                <>
                {errors.map( (error, index) => (
                    <ErrrorAlert key={index} index={index} error={error}/>
            ))}
                </>
            )
        }
    }

    return (
        <>
        {alertDialog()}
        </>
    );
}