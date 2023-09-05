import { SetupPluginStepEnum } from '@metrikube/core'
import { ArrowBack, Done, ArrowForward } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button, DialogActions, Tooltip, styled } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  activeStep: number
  steps: string[]
  isSetupPluginLoading: boolean
  isCreateAlertLoading: boolean
  isProviderChose: boolean
  setActiveStep: Dispatch<SetStateAction<number>>
  handleModalClose: () => void
}

const ProviderFormActionButtons = ({
  activeStep,
  steps,
  isSetupPluginLoading,
  isCreateAlertLoading,
  isProviderChose,
  setActiveStep,
  handleModalClose
}: Props) => {
  const isFirstStep: boolean = activeStep === SetupPluginStepEnum.CHOOSE_PLUGIN
  const isLastStep = (steps: string[], activeStep: number): boolean =>
    steps.length - 1 === activeStep

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    //  isFirstStep={isFirstStep} produce an error
    <StyledDialogActions isFirstStep={isFirstStep}>
      {!isFirstStep && !isLastStep(steps, activeStep) && (
        <Button
          variant="outlined"
          disableRipple
          startIcon={<ArrowBack />}
          onClick={() => handleBack()}>
          Back
        </Button>
      )}
      {activeStep === 1 && (
        <LoadingButton
          type="submit"
          size="small"
          loading={isSetupPluginLoading}
          loadingIndicator="Loading…"
          variant="outlined">
          Tester et continuer
        </LoadingButton>
      )}
      {activeStep === 2 && (
        <LoadingButton
          type="submit"
          size="small"
          loading={isCreateAlertLoading}
          loadingIndicator="Ajout en cours…"
          variant="outlined">
          Ajouter et continuer
        </LoadingButton>
      )}
      {(activeStep === 0 || activeStep === 2) && (
        <Tooltip disableHoverListener={isProviderChose} title="You have to choose a provider">
          <span>
            <Button
              onClick={() => handleNext()}
              variant="contained"
              disableRipple
              disabled={!isProviderChose}
              endIcon={<ArrowForward />}>
              Next
            </Button>
          </span>
        </Tooltip>
      )}
      {isLastStep(steps, activeStep) && (
        <Button
          onClick={() => handleModalClose()}
          color="success"
          variant="contained"
          disableRipple
          disabled={!isProviderChose}
          endIcon={<Done />}>
          Finish
        </Button>
      )}
    </StyledDialogActions>
  )
}

const StyledDialogActions = styled(DialogActions) <{ isFirstStep: boolean }>`
  display: flex;
  justify-content: ${({ isFirstStep }) => (isFirstStep ? 'flex-end' : 'space-between')};
  padding: 0 24px 24px 24px;
  margin-top: 24px;
`

export default ProviderFormActionButtons
