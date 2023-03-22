import { useSelector} from "react-redux";
import {Container, Box, Stepper, Typography, Grid, Step, StepLabel} from "@mui/material";
import Images from '../../Components/UpdatePublication/Images'
import InputUpdate from '../../Components/UpdatePublication/InputUpdate'

const steps = ['Editar publicación', 'Actualizar imágenes']

function Actualizar () {
  const next = useSelector(state => state.next.status)

  const isStepOptional = (step) => {
    return step === 1
  }

  return (
    <>
      <Container style={{ paddingTop: 10}} fixed>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={next}>
            {steps.map((label, index) => {
              const stepProps = {}
              const labelProps = {}
              if(isStepOptional(index)){
                labelProps.optional = (
                  <Typography variant='caption'>Opcional</Typography>
                )
              }
              return(
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </Box>
        <Grid container spacion={3}>
          {next === 0 && (
            <InputUpdate />
          )}
          {next === 1 && (
            <Images />
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Actualizar