import { useAdapter } from '../../../config/axios'
import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import ProviderFormActionButtons from '../ProviderFormActionButtons'
import ProviderFormStepper from '../ProviderFormStepper'
import ProviderFormStep1 from '../forms/ProviderFormStep1.form'
import ProviderFormStep2 from '../forms/ProviderFormStep2.form'
import ProviderFormStep3 from '../forms/ProviderFormStep3.form'
import styled from '@emotion/styled'
import { GenericCredentialType } from '@metrikube/common'
import {
  SetupPluginUsecase,
  GetPluginsUsecase,
  SetupPluginRequest,
  CreateAlertUsecase,
  CreateAlertRequest,
  SetupPluginStepEnum
} from '@metrikube/core'
import { Close } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const steps: string[] = [
  'Choose your provider',
  'Fill your credential',
  'Configure your notification',
  'Finish 🎉'
]

const ProviderModal = ({ open, setOpenModal }: Props) => {
  const { pluginAdapter, alertAdapter } = useAdapter()

  const {
    selectedProvider,
    selectedMetric,
    pluginToMetricId,
    metricAlerts,
    setSelectedProvider,
    setSelectedMetric,
    setPluginToMetricId,
    setMetricFields
  } = useContext(SetupPluginContext)

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      api_endpoint: {
        apiEndpoint: ''
      },
      aws: {
        accessKeyId: '',
        secretAccessKey: '',
        region: ''
      },
      github: {
        accessToken: '',
        owner: '',
        repo: ''
      },
      sql_database: {
        dbHost: '',
        dbName: '',
        dbPort: 0,
        dbUsername: '',
        dbPassword: ''
      },
      metric: {
        id: '',
        name: '',
        isNotifiable: false,
        refreshInterval: 30,
        type: ''
      }
    }
  })

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
          setActiveStep(SetupPluginStepEnum.FINISH)
        }
        setActiveStep(SetupPluginStepEnum.ALERT_CONFIG)
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

  // Typescript !
  const onSubmit = (data: unknown) => {
    switch (activeStep) {
      case SetupPluginStepEnum.FILL_CREDENTIAL:
        handleConnectionTest(selectedProvider?.type || '', data[selectedProvider?.type])
        break
      case SetupPluginStepEnum.ALERT_CONFIG:
        // createAlert()
        break
      default:
        break
    }
  }

  const handleFilterChange = (categoryValue: string) => {
    if (categoryValue === selectedProviderCategory) {
      setSelectedProviderCategory('')
    } else {
      setSelectedProviderCategory(categoryValue)
    }
  }

  const handleConnectionTest = (pluginType: string, credential: GenericCredentialType) => {
    if (!selectedProvider || !selectedMetric) {
      throw Error("You can't make a test connection without plugin or metric")
    }
    switch (pluginType) {
      case 'aws':
        setupPlugin({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential
        })
        break
      case 'github':
        setupPlugin({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential
        })
        break
      case 'api_endpoint':
        setupPlugin({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential
        })
        break
      case 'sql_database':
        setupPlugin({
          pluginId: selectedProvider.id,
          metricType: selectedMetric.type,
          credential
        })
        break
      default:
        throw Error("You can't make a test connection without plugin or metric")
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            handleMetricAlertAdd={handleMetricAlertAdd}
            handleModalClose={handleModalClose}
          />
        </form>
      </FormProvider>
    </Dialog>
  )
}

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export default ProviderModal
