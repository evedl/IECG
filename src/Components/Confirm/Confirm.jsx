import React from 'react';
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SendEmailConfirm } from '../../Service/ConfirmService';
import { useSelector } from 'react-redux'


function SendEmailVerify() {
    const UserId = useSelector(state => state.confirm.userId);
    const [loading, setLoading] = React.useState(true);
    const [Exito,SetExito] = React.useState(false);
    const [Error,SetError] = React.useState(false);

    React.useEffect(() => {
        const SendEmail = () => {
            SendEmailConfirm(UserId)
                .then(() => {
                    setLoading(false);
                    SetExito(true);
                }).catch(() => {
                setLoading(false);
                SetError(true);
            });
        }
        SendEmail();
    },[UserId])
  return (
    <div>
      <Typography variant="h5" textAlign="center">
          Revisa tu correo para activar tu cuenta
      </Typography>
        <Box sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {loading && (<CircularProgress />)}
            {Exito && (<Typography variant="h5" textAlign="center">
                Correo enviado.
                🤓☝️
                </Typography>
                )
            }
            {Error && (<Typography variant="h5" textAlign="center">
                Error al enviar correo.
                🤯
            </Typography>)}

        </Box>

    </div>
  );
}
export default SendEmailVerify;