import { useState } from 'react'
import { uploadAvatar } from '../../Service/AvatarService'
import Avatar from 'react-avatar-edit'
import LoadingButtonCom from '../../Components/Trayectoria/LoadingButton'
import { setText, setErrors } from '../../Features/Alert/AlertSlice'
import { setStep } from '../../Features/Profile/ProfileSlice'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../../Features/Feedback/FeedBackSlice'
import { Grid } from '@mui/material'


function UploadAvatar() {
  // 480 x 512
  const [avatar] = useState()
  const [newAvatar, setNewAvatar] = useState()
  const dispatch = useDispatch()

  const ChangeStep = (step) => {
    dispatch(setIsLoading({
      isLoading:true
    }))
    uploadAvatar(newAvatar, '480x512')
    .then(res => {
      dispatch(setIsLoading({
        isLoading:false
      }))
      dispatch(setText({
        msg: 'Guardado con exito',
        status: 1
      }))
      dispatch(setStep({
        step
      }))
    }).catch(function(err) {
      dispatch(setErrors({
        errors: [{
          msg: err.response.data.msg
        }],
        status: 2
      }))
      dispatch(setIsLoading({
        isLoading:false
      }))
    })
  }

  const onCrop = async (imagen) => {
    const blob = await fetch(imagen).then(res => res.blob())
    setNewAvatar(blob)
  }

  return (
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
          <div style={{ marginTop: '15px' }}>
            <LoadingButtonCom text="Guardar" fun={ChangeStep} funargs={1}/>
          </div>
        </Grid>
      </div>
    </Grid>
  )
}

export default UploadAvatar