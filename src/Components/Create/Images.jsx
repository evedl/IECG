import axios from "axios";
import { useState } from "react";
import reactImageSize from "react-image-size";
import { IconButton, Grid, LinearProgress, Button } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { setNext } from '../../Features/CreateNext/CreateSlice'
import { useNavigate } from "react-router-dom";
import Dialog from './Dialog'
import { filter } from 'lodash'
import { setErrors, setText } from '../../Features/Alert/AlertSlice';

function App() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState()
  const next = useSelector((state) => state.next.id)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const Setimg = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      reactImageSize(URL.createObjectURL(e.target.files[i]))
      .then(({ width, height }) => {
        setFiles(files => [...files, {
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

  const publicationCreate = () => {
    dispatch(setText({
      msg: "Publicación creada correctamente",
      status: 1
    }))
  }

  const uploadImg = () => {
    if(files.length > 0){
      for(let i = 0; i < files.length; i++){
        const data = new FormData()
        data.append('img', files[i].archivo)
        data.append('Dimensiones', `${files[i].width} x ${files[i].height}`)

        let config = {
          method: 'post',
          url: process.env.REACT_APP_API_URL + '/img/upload/' + next,
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
          if(i === files.length - 1){
            navigate('/publicaciones')
            dispatch(setNext({
              status: 0
            }))
            publicationCreate()
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
    navigate('/publicaciones')
    dispatch(setNext({
      status: 0
    }))
    publicationCreate()
  }
}

  const removeImg = (image) => {
    setFiles(
      filter(files, (file) => file !== image)
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Subir imagen</h1>
        <input type="file" name="file" accept=".jpg, .jpeg, .png" id='add-img' onChange={(e) => {Setimg(e)}} multiple style={{ display: 'none' }} />
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
              <img src={Imgs.file} alt={Imgs.name} width={300} />
              <p>{Imgs.name}</p>
              <p>{Imgs.width} x {Imgs.height}</p>
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
