import { useAdapter } from '../config/axios'
import {
  CreateAlertRequest,
  CreateAlertUsecase,
  GetPluginsUsecase,
  SetupPluginRequest,
  SetupWidgetUsecase,
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
      new SetupWidgetUsecase(pluginAdapter).execute(pluginId, name, metricType, credential),
    {
      onSuccess
    }
  )
}

export const validateCredentialsMutation = (
  onSuccess?: (data: unknown) => void,
  onError?: (data: unknown) => void
) => {
  return useMutation(
    (payload: ValidateCredentialsRequest) =>
      new ValidateCredentialsUsecase(pluginAdapter).execute(payload),
    {
      onSuccess,
      onError
    }
  )
}

export const createAlertsMutation = (onSuccess?: (data: unknown) => void) => {
  return useMutation(
    ({ widgetId, alerts }: CreateAlertRequest) => {
      return new CreateAlertUsecase(alertAdapter).execute({
        widgetId,
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
