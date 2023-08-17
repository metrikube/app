import { useAdapter } from '../../../config/axios'
import { SetupPluginContext } from '../../../contexts/SetupPlugin.context'
import ProviderFormActionButtons from '../ProviderFormActionButtons'
import ProviderFormStepper from '../ProviderFormStepper'
import ProviderFormStep1 from '../forms/ProviderFormStep1.form'
import ProviderFormStep2 from '../forms/ProviderFormStep2.form'
import ProviderFormStep3 from '../forms/ProviderFormStep3.form'
import styled from '@emotion/styled'
import {
  ApiEndpointCredentialType,
  AwsCredentialType,
  DbConnectionCredentialType,
  GenericCredentialType,
  GithubCredentialType
} from '@metrikube/common'
import {
  SetupPluginUsecase,
  GetPluginsUsecase,
  SetupPluginRequest,
  CreateAlertUsecase,
  CreateAlertRequest,
  SetupPluginStepEnum,
  AlertRequest,
  MetricModel,
  AlertForm,
  PluginModel
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

type SetupPluginFormValues = {
  api_endpoint: ApiEndpointCredentialType
  aws: AwsCredentialType
  github: GithubCredentialType
  sql_database: DbConnectionCredentialType
  metric: MetricModel
  metricAlerts: AlertForm[]
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
    setSelectedProvider,
    setSelectedMetric,
    setPluginToMetricId,
    setMetricFields
  } = useContext(SetupPluginContext)

  const methods = useForm<SetupPluginFormValues>({
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
        type: undefined
      },
      metricAlerts: [
        {
          label: '',
          condition: {
            field: '',
            operator: 'gt',
            threshold: ''
          }
        }
      ]
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

  const onSubmit = (data: SetupPluginFormValues) => {
    if (!selectedProvider || !selectedMetric) {
      throw Error("You can't make a test connection without plugin or metric")
    }
    switch (activeStep) {
      case SetupPluginStepEnum.FILL_CREDENTIAL:
        // eslint-disable-next-line no-case-declarations
        const credential: GenericCredentialType = data[selectedProvider.type]
        handleConnectionTest(selectedProvider, selectedMetric, credential)
        break
      case SetupPluginStepEnum.ALERT_CONFIG:
        // eslint-disable-next-line no-case-declarations
        const alerts: AlertRequest[] = data.metricAlerts.map((metricAlert: AlertForm) => ({
          ...metricAlert,
          metricId: selectedMetric?.id
        }))
        createAlert({
          pluginToMetricId,
          alerts
        })
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

  const handleConnectionTest = (
    plugin: PluginModel,
    metric: MetricModel,
    credential: GenericCredentialType
  ) => {
    switch (plugin.type) {
      case 'aws':
        setupPlugin({
          pluginId: plugin.id,
          metricType: metric.type,
          credential
        })
        break
      case 'github':
        setupPlugin({
          pluginId: plugin.id,
          metricType: metric.type,
          credential
        })
        break
      case 'api_endpoint':
        setupPlugin({
          pluginId: plugin.id,
          metricType: metric.type,
          credential
        })
        break
      case 'sql_database':
        setupPlugin({
          pluginId: plugin.id,
          metricType: metric.type,
          credential
        })
        break
      default:
        throw Error("You can't make a test connection without plugin or metric")
    }
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setSelectedProviderCategory('')
    setSelectedProvider(null)
    setSelectedMetric(null)
    setActiveStep(0)
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
