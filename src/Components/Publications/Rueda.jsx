import React from 'react'
import { Add, KeyboardBackspace } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Crear = () => {
  const navigate = useNavigate()

  return (
    <Fab
      color="primary"
      aria-label="Navegación"
      sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
      onClick={() => navigate('/crear')}
    >
      <Add />
    </Fab>
  )
}

export const Regresar = () => {
  const navigate = useNavigate()

  return (
    <Fab
      color="primary"
      aria-label="Navegación"
      sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
      onClick={() => navigate(-1)}
    >
      <KeyboardBackspace />
    </Fab>
  )
}
