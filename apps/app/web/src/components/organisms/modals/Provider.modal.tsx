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
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { createPluginAlertMutation, getPluginsQuery, setupPluginMutation, validateCredentialsMutation } from '../../../services/plugin.service'
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
  'Choix du plugin',
  'Renseigner vos identifiants',
  'Configurer vos notifications',
  'Terminé 🎉'
]

const ProviderModal = ({ open, setOpenModal }: Props) => {
  const {
    selectedProvider,
    selectedMetric,
    pluginToMetricId,
    setSelectedProvider,
    setSelectedMetric,
    setPluginToMetricId,
  } = useContext(SetupPluginContext)

  const methods = useForm<SetupPluginFormValues>({
    mode: 'all',
    defaultValues: {
      metricAlerts: []
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

  const { mutate: validateCredentials } = validateCredentialsMutation((data) => {
    if (data.dataSample) {
      return setActiveStep(SetupPluginStepEnum.ALERT_CONFIG)
    }
    return setActiveStep(SetupPluginStepEnum.FINISH)
  })
  const { mutate: createAlert, isLoading: isCreateAlertLoading } = createPluginAlertMutation()

  const { mutate: setupPlugin, isLoading: isSetupPluginLoading } = setupPluginMutation((data) => {
    setPluginToMetricId(data.id)
    queryClient.invalidateQueries({ queryKey: ["getActiveMetrics"] })
  })

  const handleFilterChange = (categoryValue: string) => {
    setSelectedProviderCategory(categoryValue)
  }

  const handleConnectionTest = (metricId: string, credentials: GenericCredentialType) => {
    return new Promise((resolve) => {
      validateCredentials({ metricId, credentials })
      resolve(null)
    })
  }

  const handlMetricInstallation = (name: string,
    plugin: PluginModel,
    metric: MetricModel,
    credential: GenericCredentialType) => {
    return new Promise((resolve) => {
      setupPlugin({
        pluginId: plugin.id,
        metricType: metric.type,
        name,
        credential
      })
      resolve(null)
    });
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setSelectedProviderCategory('')
    setSelectedProvider(null)
    setSelectedMetric(null)
    setActiveStep(0)
    methods.reset()
  }

  const onSubmit = (data: SetupPluginFormValues) => {
    if (!selectedProvider || !selectedMetric) {
      throw Error("You can't make a test connection without plugin or metric")
    }
    const pluginType: string = selectedProvider.type
    const credentials = data[pluginType] as GenericCredentialType

    const alerts: AlertRequest[] = data.metricAlerts.map((metricAlert: AlertForm) => ({
      ...metricAlert,
      metricId: selectedMetric?.id
    }))

    switch (activeStep) {
      case SetupPluginStepEnum.FILL_CREDENTIAL:
        handleConnectionTest(selectedMetric.id, credentials).then(() => {
          if (!selectedMetric.isNotifiable) {
            handlMetricInstallation(data.name, selectedProvider, selectedMetric, credentials)
              .then(() => {
                if (alerts.length) {
                  createAlert({
                    pluginToMetricId,
                    alerts
                  })
                }
              }).finally(() => {
                setActiveStep(SetupPluginStepEnum.FINISH)
              })
          }
          setActiveStep(SetupPluginStepEnum.ALERT_CONFIG)
        })
        break
      case SetupPluginStepEnum.ALERT_CONFIG:
        handlMetricInstallation(data.name, selectedProvider, selectedMetric, credentials)
          .then(() => {
            if (alerts.length) {
              createAlert({
                pluginToMetricId,
                alerts
              })
            }
          }).finally(() => {
            setActiveStep(SetupPluginStepEnum.FINISH)
          })

        break
      case SetupPluginStepEnum.FINISH:
        handleModalClose()
        break
      default:
        break
    }
  }
  return (
    <Dialog open={open} maxWidth="md" fullWidth={true} onClose={handleModalClose}>
      <DialogTitle>
        <DialogHeader >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Ajouter un widget
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
