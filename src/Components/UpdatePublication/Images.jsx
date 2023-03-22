import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";
import reactImageSize from "react-image-size";
import { IconButton, Grid, LinearProgress, Button } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setNext } from '../../Features/CreateNext/CreateSlice'
import { useNavigate, useParams } from "react-router-dom";
import Dialog from './Dialog'
import { filter } from 'lodash'
import { setErrors, setText } from '../../Features/Alert/AlertSlice';
import { GetIdPublication } from '../../Service/GetPublication'
import { eliminarImagen } from '../../Service/ImageService'

function App() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [Newfiles, setNewfiles] = useState([])
  const [Deletefiles, setDeletefiles] = useState([])
  const { id } = useParams(); 

  useEffect(() => {
    GetIdPublication(id).then(res => {
      setFiles(res.data.Urls)
    })
    .catch((err) => {
    })
  }, [id])


  const Setimg = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      reactImageSize(URL.createObjectURL(e.target.files[i]))
      .then(({ width, height }) => {
        setNewfiles(files => [...files, {
          archivo: e.target.files[i],
          file: URL.createObjectURL(e.target.files[i]),
          name: e.target.files[i].name,
          width: width,
          height: height,
          id: e.target.files[i].id
        }])
      }).catch((err) => {
      })
    }
  }

  useLayoutEffect(() => {
    if(Newfiles.length > 0) {
      Newfiles.forEach(Newfile => {
        if(files.indexOf(Newfile) ===-1) {
          setFiles(files => [...files, Newfile])
        }
      })
  }
  }, [Newfiles, files])

  const publicationUpdate = () => {
    dispatch(setText({
      msg: "Publicación editada correctamente",
      status: 1
    }))
  }

  const deleteImage = () => {
    if(Deletefiles.length > 0) {
      for (let i = 0; i < Deletefiles.length; i++) {
        eliminarImagen(id, Deletefiles[i].split('/')[Deletefiles[i].split('/').length - 1])
        .then(res => {
          navigate('/publicaciones')
            dispatch(setNext({
              status: 0
            }))
            publicationUpdate()
        }).catch((err) => {
          dispatch(setErrors({
            errors: [{
              msg: err.response.data.msg
            }],
          }))
        }
        )
      }
    }
    else{
      navigate('/publicaciones')
            dispatch(setNext({
              status: 0
        }))
    }
  }

  const uploadImg = () => {
    if(Newfiles.length > 0){
      for(let i = 0; i < Newfiles.length; i++){
        const data = new FormData()
        data.append('img', Newfiles[i].archivo)
        data.append('Dimensiones', `${Newfiles[i].width} x ${Newfiles[i].height}`)

        let config = {
          method: 'post',
          url: process.env.REACT_APP_API_URL + '/img/upload/' + id,
          headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('GTO')
          },
          data : data,
          onProgress: data => {
            setProgress(Math.round((100 * data.loaded) / data.total))
          }
        };
        axios(config)
        .then(function (response) {
          if(i === Newfiles.length - 1){
            deleteImage()
          }
        })
        .catch(function (error) {
          dispatch(setErrors({
            errors: [{
              msg: error.response.data.msg
            }],
            status: 2
          }))
        });
      }
  }
  else{
    deleteImage()
  }
}

  const removeImg = (image) => {
    setFiles(
      filter(files, (file) => file !== image)
    )
    if(typeof image === 'string'){
      setDeletefiles(Deletefiles => [...Deletefiles, image])
    }
    else{
      setNewfiles(
        filter(Newfiles, (file) => file !== image)
        )
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Subir imagen</h1>
        <input type="file" name="file" accept=".jpg, .jpeg, .png, .jfif" id='add-img' onChange={(e) => {Setimg(e)}} multiple style={{ display: 'none' }} />
        <label htmlFor="add-img">
          <IconButton color='primary' aria-label='upload image' component='div' style={{ marginBottom: 50 }}>
            <AddPhotoAlternate />
          </IconButton>
        </label>
      <Grid container spacing={{ xs: 2, sm: 4, md: 4, lg: 3 }} columns={{ xs: 1, sm: 2, md: 8, lg: 12 }}>
        {files.map((Imgs, index) => {
          return (
            <Grid key={index} item xs={2} sm={4} md={4}>
              {progress && <LinearProgress now={progress} label={`${progress}%`} />}
              <img src={Imgs.file || Imgs} alt={Imgs.name} width={300} />
            <p>{Imgs.name || Imgs.split('/')[Imgs.split('/').length-1]+".jpg"}</p>
            {Imgs.width &&
            <p>{Imgs.width +'x'+ Imgs.height}</p>
            }
              <Button variant='contained' color='error' onClick={() => removeImg(Imgs)}>Borrar imagen</Button>
            </Grid>
          )
        })}
      </Grid>
      <div>
        <Dialog onClick={uploadImg} />
      </div>
    </div>
  )
}

export default App;
