/* eslint-disable prettier/prettier */
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
  SetupPluginStepEnum,
  AlertRequest,
  MetricModel,
  AlertForm,
  PluginModel
} from '@metrikube/core'
import { Close } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Divider, Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { createPluginAlertMutation, getPluginsQuery, setupPluginMutation } from '../../../services/plugin.service'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

type SetupPluginFormValues = {
  api_endpoint: ApiEndpointCredentialType
  aws: AwsCredentialType
  github: GithubCredentialType
  sql_database: DbConnectionCredentialType
  name: string
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
      name: '',
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
  const queryClient = useQueryClient()
  const { data: plugins } = getPluginsQuery()

  useEffect(() => {
    setIsProviderChose(selectedProvider !== null)
  }, [selectedProvider])

  const { mutate: setupPlugin, isLoading: isSetupPluginLoading } = setupPluginMutation((data) => {
    setPluginToMetricId(data.id)
    setMetricFields(data.data)
    if (selectedMetric?.isNotifiable) {
      setActiveStep(SetupPluginStepEnum.FINISH)
    }
    setActiveStep(SetupPluginStepEnum.ALERT_CONFIG)
    queryClient.invalidateQueries({ queryKey: ["getActiveMetrics"] })
  })

  const { mutate: createAlert, isLoading: isCreateAlertLoading } = createPluginAlertMutation(() => {
    setActiveStep(activeStep + 1)
  })


  const onSubmit = (data: SetupPluginFormValues) => {
    if (!selectedProvider || !selectedMetric) {
      throw Error("You can't make a test connection without plugin or metric")
    }
    switch (activeStep) {
      case SetupPluginStepEnum.FILL_CREDENTIAL:
        // eslint-disable-next-line no-case-declarations
        const credential: GenericCredentialType = data[selectedProvider.type]
        handleConnectionTest(data.name, selectedProvider, selectedMetric, credential)
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
    setSelectedProviderCategory(categoryValue)
  }

  const handleConnectionTest = (
    name: string,
    plugin: PluginModel,
    metric: MetricModel,
    credential: GenericCredentialType
  ) => {
    switch (plugin.type) {
      case 'aws':
        setupPlugin({
          pluginId: plugin.id,
          metricType: metric.type,
          name,
          credential
        })
        break
      case 'github':
        setupPlugin({
          pluginId: plugin.id,
          metricType: metric.type,
          name,
          credential
        })
        break
      case 'api_endpoint':
        setupPlugin({
          pluginId: plugin.id,
          metricType: metric.type,
          name,
          credential
        })
        break
      case 'sql_database':
        setupPlugin({
          pluginId: plugin.id,
          metricType: metric.type,
          name,
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
        <DialogHeader >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {activeStep === SetupPluginStepEnum.ALERT_CONFIG ? `${selectedProvider?.name} settings` : 'Set up your provider'}
          </Typography>
          <IconButton onClick={handleModalClose}>
            <Close />
          </IconButton>
        </DialogHeader>
      </DialogTitle>
      <DialogContent>
        <ProviderFormStepper activeStep={activeStep} steps={steps} />
        <Divider sx={{ mb: '20px' }} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box>
              {activeStep === SetupPluginStepEnum.CHOOSE_PLUGIN && (
                <ProviderFormStep1
                  providerCategory={selectedProviderCategory}
                  allPlugins={plugins}
                  onCategoryClick={handleFilterChange}
                />
              )}
              {activeStep === SetupPluginStepEnum.FILL_CREDENTIAL && <ProviderFormStep2 />}
              {activeStep === SetupPluginStepEnum.ALERT_CONFIG && <ProviderFormStep3 />}
              {activeStep === SetupPluginStepEnum.FINISH && <p>Félicitations</p>}
            </Box>
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
      </DialogContent>

    </Dialog>
  )
}

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export default ProviderModal
