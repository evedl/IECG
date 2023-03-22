import Images from '../../Components/Create/Images'
import InputCreate from '../../Components/Create/InputCreate'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const steps = ['Crear publicación', 'Subir imagen']

function Create() {
  const [skipped] = useState(new Set())
  const next = useSelector((state) => state.next.status)

  const isStepOptional = (step) => {
    return step === 1
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  return (
    <Box sx={{ width: '70%', margin: '30px auto' }}>
      <Stepper activeStep={next}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Opcional</Typography>
            )
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {next === 0 && (
        <InputCreate />
      )}
      {next === 1 && (
        <Images />
      )}
    </Box>
  )
}

export default Create