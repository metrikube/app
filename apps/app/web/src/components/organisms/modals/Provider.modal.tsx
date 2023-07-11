import { ProviderFormContext } from '../../../contexts/provider-form.context'
import ProviderFormStepper from '../ProviderFormStepper'
import ProviderFormStep1 from '../forms/ProviderFormStep1.form'
import ProviderFormStep2 from '../forms/ProviderFormStep2.form'
import ProviderFormStep3 from '../forms/ProviderFormStep3.form'
import styled from '@emotion/styled'
import { ArrowBack, ArrowForward, Close } from '@mui/icons-material'
import {
  Button,
  CSSObject,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const ProviderModal = ({ open, setOpenModal }: Props) => {
  const steps: string[] = [
    'Choose your provider',
    'Fill your credential',
    'Configure your provider'
  ]
  const [selectedProviderCategory, setSelectedProviderCategory] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<{
    id: string
    name: string
    credential: {}
  } | null>(null)
  const [selectedMetric, setselectedMetric] = useState<unknown[]>([])
  const [isProviderChose, setIsProviderChose] = useState(selectedProvider !== null)
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleFilterChange = (categoryValue: string) => {
    if (categoryValue === selectedProviderCategory) {
      setSelectedProviderCategory('')
    } else {
      setSelectedProviderCategory(categoryValue)
    }
  }

  const handleProviderChange = (provider: any) => {
    setSelectedProvider({ ...provider })
  }

  const handleMetricChange = (metric: unknown) => {
    setselectedMetric({ ...metric })
  }

  const handleReset = () => {
    setActiveStep(0)
    setSelectedProviderCategory('')
    setselectedMetric([])
    setSelectedProvider(null)
  }

  const isFirstStepForm: boolean = activeStep === 0

  const isLastStep = (steps: string[], activeStep: number): boolean =>
    steps.length - 1 === activeStep

  const dialogActionStyle: CSSObject = {
    display: 'flex',
    justifyContent: isFirstStepForm ? 'flex-end' : 'space-between'
  }

  useEffect(() => {
    setIsProviderChose(selectedProvider !== null)
  }, [selectedProvider])

  return (
    <ProviderFormContext.Provider value={{ selectedProvider, selectedMetric }}>
      <Dialog open={open} maxWidth="md" fullWidth={true} onClose={() => setOpenModal(false)}>
        <DialogTitle>
          <DialogHeader>
            <span>
              {activeStep === 2 ? `${selectedProvider?.name} settings` : 'Set up your provider'}
            </span>
            <IconButton onClick={() => setOpenModal(false)}>
              {' '}
              <Close />{' '}
            </IconButton>
          </DialogHeader>
          <ProviderFormStepper activeStep={activeStep} steps={steps} />
        </DialogTitle>
        <DialogContent>
          {activeStep === 0 && (
            <ProviderFormStep1
              providerCategory={selectedProviderCategory}
              handleProviderCategory={handleFilterChange}
              handleProvider={handleProviderChange}
            />
          )}
          {activeStep === 1 && <ProviderFormStep2 handleMetrics={handleMetricChange} />}
          {activeStep === 2 && <ProviderFormStep3 />}
        </DialogContent>
        <DialogActions sx={dialogActionStyle}>
          {!isFirstStepForm && (
            <Button
              variant="text"
              disableRipple
              startIcon={<ArrowBack />}
              onClick={() => handleBack()}>
              Back
            </Button>
          )}
          {isLastStep(steps, activeStep) ? (
            <Button
              variant="text"
              disableRipple
              disabled={!isProviderChose}
              endIcon={<ArrowForward />}>
              Finish
            </Button>
          ) : (
            <Tooltip disableHoverListener={isProviderChose} title="You have to choose a provider">
              <span>
                <Button
                  onClick={() => handleNext()}
                  variant="text"
                  disableRipple
                  disabled={!isProviderChose}
                  endIcon={<ArrowForward />}>
                  Next
                </Button>
              </span>
            </Tooltip>
          )}
        </DialogActions>
      </Dialog>
    </ProviderFormContext.Provider>
  )
}

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export default ProviderModal
