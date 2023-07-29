import { useAdapter } from '../../../config/axios'
import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import ProviderFormStepper from '../ProviderFormStepper'
import ProviderFormStep1 from '../forms/ProviderFormStep1.form'
import ProviderFormStep2 from '../forms/ProviderFormStep2.form'
import ProviderFormStep3 from '../forms/ProviderFormStep3.form'
import styled from '@emotion/styled'
import {
  SetupPluginUsecase,
  GetPluginsUsecase,
  SetupPluginRequest,
  CreateAlertUsecase,
  CreateAlertRequest
} from '@metrikube/core'
import { ArrowBack, ArrowForward, Close, Done } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState, useMemo } from 'react'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const ProviderModal = ({ open, setOpenModal }: Props) => {
  const { pluginAdapter, alertAdapter } = useAdapter()

  const steps: string[] = [
    'Choose your provider',
    'Fill your credential',
    'Configure your notification',
    'Finish 🎉'
  ]

  const {
    selectedProvider,
    selectedMetric,
    githubCredential,
    awsCredential,
    apiHealthCheckCredential,
    dbCredential,
    pluginToMetricId,
    metricAlerts,
    setSelectedProvider,
    setSelectedMetric,
    setPluginToMetricId,
    setMetricFields
  } = useContext(SetupPluginContext)

  const [selectedProviderCategory, setSelectedProviderCategory] = useState('')
  const [isProviderChose, setIsProviderChose] = useState<boolean>(selectedProvider !== null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setIsProviderChose(selectedProvider !== null)
  }, [selectedProvider])

  const { data: plugins } = useQuery({
    queryKey: ['getPlugins'],
    queryFn: () => new GetPluginsUsecase(pluginAdapter).execute(),
    initialData: () => []
  })

  const { mutate, isLoading, status } = useMutation(
    ({ pluginId, metricType, credential }: SetupPluginRequest) =>
      new SetupPluginUsecase(pluginAdapter).execute(pluginId, metricType, credential),
    {
      // how to type that ??
      onSuccess: (data) => {
        setPluginToMetricId(data.id)
        setMetricFields(data.data)
        if (selectedMetric?.isNotifiable) {
          setActiveStep(activeStep + 2)
        }
        setActiveStep(activeStep + 1)
      },
      onError: () => {
        alert('there was an error')
      }
    }
  )

  const { mutate: createAlert } = useMutation(
    ({ pluginToMetricId, alerts }: CreateAlertRequest) => {
      if (!selectedProvider || !selectedMetric) {
        throw Error("You can't make an alert without plugin or metric")
      }
      return new CreateAlertUsecase(alertAdapter).execute({
        pluginToMetricId,
        alerts
      })
    },
    {
      onSuccess: () => {
        setActiveStep(activeStep + 1)
      },
      onError: () => {
        alert('there was an error')
      }
    }
  )

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

  const handleConnectionTest = () => {
    if (!selectedProvider || !selectedMetric) {
      throw Error("You can't make a test connection without plugin or metric")
    }
    switch (selectedProvider?.type) {
      case 'aws':
        mutate({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential: awsCredential
        })
        break
      case 'github':
        mutate({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential: githubCredential
        })
        break
      case 'api_endpoint':
        mutate({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential: apiHealthCheckCredential
        })
        break
      case 'sql_database':
        mutate({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential: dbCredential
        })
        break
      default:
        throw Error("You can't make a test connection without plugin or metric")
        break
    }
  }

  const handleMetricAlertAdd = () => {
    createAlert({
      pluginToMetricId,
      alerts: metricAlerts
    })
  }

  const handleReset = () => {
    setActiveStep(0)
    setSelectedProviderCategory('')
    setSelectedProvider(null)
    setSelectedMetric(null)
  }

  const handleModalClose = () => {
    setOpenModal(false)
    handleReset()
  }

  const isFirstStep: boolean = activeStep === 0

  const isLastStep = (steps: string[], activeStep: number): boolean =>
    steps.length - 1 === activeStep

  const setBtnColor = (btnStatus: string): 'success' | 'error' | 'primary' => {
    switch (btnStatus) {
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      default:
        return 'primary'
    }
  }

  const shouldDisableTestConnectionBtn = (): boolean => {
    return !selectedProvider || !selectedMetric
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true} onClose={handleModalClose}>
      <DialogTitle>
        <DialogHeader>
          <span>
            {activeStep === 2 ? `${selectedProvider?.name} settings` : 'Set up your provider'}
          </span>
          <IconButton onClick={handleModalClose}>
            <Close />
          </IconButton>
        </DialogHeader>
        <ProviderFormStepper activeStep={activeStep} steps={steps} />
      </DialogTitle>
      <DialogContent>
        {activeStep === 0 && (
          <ProviderFormStep1
            providerCategory={selectedProviderCategory}
            allPlugins={plugins}
            handleProviderCategory={handleFilterChange}
          />
        )}
        {activeStep === 1 && <ProviderFormStep2 />}
        {activeStep === 2 && <ProviderFormStep3 />}
      </DialogContent>
      {/* TODO: We need to move all actions buttons in his own component, because logic is too complex */}
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
            onClick={handleConnectionTest}
            disabled={shouldDisableTestConnectionBtn()}
            size="small"
            loading={isLoading}
            color={setBtnColor(status)}
            loadingIndicator="Loading…"
            variant="outlined">
            Tester et continuer
          </LoadingButton>
        )}
        {activeStep === 2 && (
          <LoadingButton
            onClick={handleMetricAlertAdd}
            size="small"
            loading={isLoading}
            loadingIndicator="Ajout en cours…"
            variant="outlined">
            Ajouter et continuer
          </LoadingButton>
        )}
        {isLastStep(steps, activeStep) ? (
          <Button
            onClick={() => handleModalClose()}
            variant="contained"
            disableRipple
            disabled={!isProviderChose}
            endIcon={<Done />}>
            Finish
          </Button>
        ) : (
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
      </StyledDialogActions>
    </Dialog>
  )
}

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledDialogActions = styled(DialogActions) <{ isFirstStep: boolean }>`
  display: flex;
  justify-content: ${({ isFirstStep }) => (isFirstStep ? 'flex-end' : 'space-between')};
  padding: 0 24px 24px 24px;
  margin-top: 24px;
`

export default ProviderModal
