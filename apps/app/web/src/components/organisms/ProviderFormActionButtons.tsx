import { SetupPluginContext } from '../../contexts/SetupPlugin.context'
import { ArrowBack, Done, ArrowForward } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button, DialogActions, Tooltip, styled } from '@mui/material'
import React, { Dispatch, SetStateAction, useContext } from 'react'

interface Props {
  activeStep: number
  steps: string[]
  isSetupPluginLoading: boolean
  isCreateAlertLoading: boolean
  isProviderChose: boolean
  setActiveStep: Dispatch<SetStateAction<number>>
  handleMetricAlertAdd: () => void
  handleModalClose: () => void
}

const ProviderFormActionButtons = ({
  activeStep,
  steps,
  isSetupPluginLoading,
  isCreateAlertLoading,
  isProviderChose,
  setActiveStep,
  handleMetricAlertAdd,
  handleModalClose
}: Props) => {
  const { selectedProvider, selectedMetric } = useContext(SetupPluginContext)
  const isFirstStep: boolean = activeStep === 0
  const isLastStep = (steps: string[], activeStep: number): boolean =>
    steps.length - 1 === activeStep

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const shouldDisableTestConnectionBtn = (): boolean => {
    return !selectedProvider || !selectedMetric
  }

  return (
    <StyledDialogActions isFirstStep={isFirstStep}>
      {!isFirstStep && (
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
          // disabled={shouldDisableTestConnectionBtn()}
          size="small"
          loading={isSetupPluginLoading}
          loadingIndicator="Loading…"
          variant="outlined">
          Tester et continuer
        </LoadingButton>
      )}
      {activeStep === 2 && (
        <LoadingButton
          onClick={handleMetricAlertAdd}
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

const StyledDialogActions = styled(DialogActions)<{ isFirstStep: boolean }>`
  display: flex;
  justify-content: ${({ isFirstStep }) => (isFirstStep ? 'flex-end' : 'space-between')};
  padding: 0 24px 24px 24px;
  margin-top: 24px;
`

export default ProviderFormActionButtons
