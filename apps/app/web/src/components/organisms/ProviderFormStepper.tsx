import { Step, StepButton, Stepper } from '@mui/material'
import React from 'react'

interface Props {
  activeStep: number
  steps: string[]
}

const ProviderFormStepper = ({ activeStep, steps }: Props) => {
  return (
    <Stepper sx={{ mt: '8px' }} activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepButton disableRipple color="inherit">
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  )
}

export default ProviderFormStepper
