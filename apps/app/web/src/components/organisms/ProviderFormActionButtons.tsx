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
}

const ProviderFormActionButtons = ({
  activeStep,
  steps,
  isSetupPluginLoading,
  isCreateAlertLoading,
  isProviderChose,
  setActiveStep
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
    <StyledDialogActions isFirstStep={isFirstStep}>
      {!isFirstStep && !isLastStep(steps, activeStep) && (
        <Button
          variant="outlined"
          disableRipple
          startIcon={<ArrowBack />}
          onClick={() => handleBack()}>
          Retour
        </Button>
      )}
      {activeStep === SetupPluginStepEnum.FILL_CREDENTIAL && (
        <LoadingButton
          type="submit"
          size="small"
          loading={isSetupPluginLoading}
          loadingIndicator="Loading…"
          variant="outlined">
          Tester et continuer
        </LoadingButton>
      )}
      {activeStep === SetupPluginStepEnum.ALERT_CONFIG && (
        <LoadingButton
          type="submit"
          size="small"
          loading={isCreateAlertLoading}
          loadingIndicator="Ajout en cours…"
          variant="outlined">
          Ajouter et continuer
        </LoadingButton>
      )}
      {activeStep === SetupPluginStepEnum.CHOOSE_PLUGIN && (
        <Tooltip
          placement="left"
          disableHoverListener={isProviderChose}
          title="Vous devez choisir un plugin">
          <span>
            <Button
              onClick={() => handleNext()}
              variant="contained"
              disableRipple
              disabled={!isProviderChose}
              endIcon={<ArrowForward />}>
              Suivant
            </Button>
          </span>
        </Tooltip>
      )}
      {isLastStep(steps, activeStep) && (
        <Button
          type="submit"
          color="success"
          variant="contained"
          disableRipple
          disabled={!isProviderChose}
          endIcon={<Done />}>
          Terminé
        </Button>
      )}
    </StyledDialogActions>
  )
}

const StyledDialogActions = styled(DialogActions, {
  shouldForwardProp: (prop) => prop !== 'isFirstStep'
})<{ isFirstStep: boolean }>`
  display: flex;
  justify-content: ${({ isFirstStep }) => (isFirstStep ? 'flex-end' : 'space-between')};
  margin-top: 12px;
  padding: 10px 0;
`

export default ProviderFormActionButtons
