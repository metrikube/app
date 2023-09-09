import { useAdapter } from '../config/axios'
import {
  CreateAlertRequest,
  CreateAlertUsecase,
  GetPluginsUsecase,
  SetupPluginRequest,
  SetupPluginUsecase,
  ValidateCredentialsRequest,
  ValidateCredentialsUsecase
} from '@metrikube/core'
import { useMutation, useQuery } from '@tanstack/react-query'

const { pluginAdapter, alertAdapter } = useAdapter()

export const getPluginsQuery = () => {
  return useQuery({
    queryKey: ['getPlugins'],
    queryFn: () => new GetPluginsUsecase(pluginAdapter).execute(),
    initialData: () => [],
    refetchOnWindowFocus: false
  })
}

export const setupPluginMutation = (onSuccess: (data: unknown) => void) => {
  return useMutation(
    ({ pluginId, name, metricType, credential }: SetupPluginRequest) =>
      new SetupPluginUsecase(pluginAdapter).execute(pluginId, name, metricType, credential),
    {
      onSuccess,
      onError: () => {
        alert('there was an error')
      }
    }
  )
}

export const validateCredentialsMutation = (onSuccess: (data: unknown) => void) => {
  return useMutation(
    (payload: ValidateCredentialsRequest) =>
      new ValidateCredentialsUsecase(pluginAdapter).execute(payload),
    {
      onSuccess,
      onError() {
        alert('Test failed')
      }
    }
  )
}

export const createPluginAlertMutation = (onSuccess: (data: unknown) => void) => {
  return useMutation(
    ({ pluginToMetricId, metricId, alerts }: CreateAlertRequest) => {
      return new CreateAlertUsecase(alertAdapter).execute({
        pluginToMetricId,
        metricId,
        alerts
      })
    },
    {
      onSuccess,
      onError: () => {
        alert('An error was occurred')
      }
    }
  )
}
