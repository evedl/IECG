import SignUp from "./SingUp"
import { Box, Stepper, Step, StepLabel } from "@mui/material"
import { useSelector } from 'react-redux'
import Confirm from "../../Components/Confirm/Confirm"

const steps = ['Crear cuenta', 'Confirmar cuenta']

function StepsRegister() {
  const confirm = useSelector((state) => state.confirm.status)

  return (
    <Box sx={{ width: '70%', margin: '30px auto' }}>
      <Stepper activeStep={confirm}>
        {steps.map((label) => {
          return (
            <Step key={label} >
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {confirm === 0 && (
        <SignUp />
      )}
      {confirm === 1 && (
        <Confirm />
      )}
    </Box>
  )
}

export default StepsRegister