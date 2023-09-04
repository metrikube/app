import { useAdapter } from '../config/axios'
import { CreateAlertRequest, CreateAlertUsecase, GetPluginsUsecase, SetupPluginRequest, SetupPluginUsecase } from '@metrikube/core'
import { useMutation, useQuery } from '@tanstack/react-query'

const { pluginAdapter, alertAdapter } = useAdapter()
export const getPluginsQuery = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ['getPlugins'],
    queryFn: () => new GetPluginsUsecase(pluginAdapter).execute(),
    enabled: isEnabled,
    initialData: () => []
  })
}

export const setupPluginMutation = (onSuccess: (data: unknown) => void) => {
  return useMutation(
    ({ pluginId, name, metricType, credential }: SetupPluginRequest) =>
      new SetupPluginUsecase(pluginAdapter).execute(pluginId, name, metricType, credential),
    {
      // how to type that ??
      onSuccess,
      onError: () => {
        alert('there was an error')
      }
    }
  )
}

export const createPluginAlertMutation = (onSuccess: () => void) => {
  return useMutation(
    ({ pluginToMetricId, alerts }: CreateAlertRequest) => {
      return new CreateAlertUsecase(alertAdapter).execute({
        pluginToMetricId,
        alerts
      })
    },
    {
      onSuccess,
      onError: () => {
        alert('there was an error')
      }
    }
  )
}
