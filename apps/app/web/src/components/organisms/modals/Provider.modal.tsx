import { useAdapter } from '../../../config/axios'
import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import ProviderFormActionButtons from '../ProviderFormActionButtons'
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
import { Close } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
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

  // sortir dans une classe statique
  const { data: plugins } = useQuery({
    queryKey: ['getPlugins'],
    queryFn: () => new GetPluginsUsecase(pluginAdapter).execute(),
    initialData: () => []
  })

  const { mutate: setupPlugin, isLoading: isSetupPluginLoading } = useMutation(
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

  const { mutate: createAlert, isLoading: isCreateAlertLoading } = useMutation(
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
        setupPlugin({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential: awsCredential
        })
        break
      case 'github':
        setupPlugin({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential: githubCredential
        })
        break
      case 'api_endpoint':
        setupPlugin({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential: apiHealthCheckCredential
        })
        break
      case 'sql_database':
        setupPlugin({
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
        {activeStep === 3 && <p>Félicitations</p>}
      </DialogContent>
      <ProviderFormActionButtons
        activeStep={activeStep}
        steps={steps}
        isSetupPluginLoading={isSetupPluginLoading}
        isCreateAlertLoading={isCreateAlertLoading}
        isProviderChose={isProviderChose}
        setActiveStep={setActiveStep}
        handleConnectionTest={handleConnectionTest}
        handleMetricAlertAdd={handleMetricAlertAdd}
        handleModalClose={handleModalClose}
      />
    </Dialog>
  )
}

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export default ProviderModal
