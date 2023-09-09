import { useAdapter } from '../config/axios'
import {
  ActiveMetricModel,
  AlertModel,
  DeleteActiveMetricAlertUsecase,
  DeleteActiveMetricUsecase,
  GetActiveMetricAlertUsecase,
  GetActiveMetricsUsecase,
  GetAlertFieldsUsecase,
  Option,
  ToggleAlertNotification,
  ToggleAlertNotificationUsecase
} from '@metrikube/core'
import { useMutation, useQuery } from '@tanstack/react-query'

const { dashboardMetricsAdapter, alertAdapter } = useAdapter()

export const getActiveMetricQuery = () => {
  return useQuery<ActiveMetricModel[]>({
    queryKey: ['getActiveMetrics'],
    queryFn: () => new GetActiveMetricsUsecase(dashboardMetricsAdapter).execute(),
    initialData: () => [],
    refetchOnWindowFocus: false
    // refetchIntervalInBackground - à creuser
  })
}

export const getActiveMetricAlertsQuery = (activeMetricId: string) =>
  useQuery({
    queryKey: ['getActiveMetricAlert'],
    queryFn: async (): Promise<AlertModel[]> =>
      new GetActiveMetricAlertUsecase(alertAdapter).execute(activeMetricId),
    initialData: () => [],
    refetchOnWindowFocus: false
  })

export const deleteMetricMutation = (onSuccess: () => void) =>
  useMutation({
    mutationKey: ['deleteMetric'],
    mutationFn: async (activeMetricId: string) => {
      await new DeleteActiveMetricUsecase(dashboardMetricsAdapter).execute(activeMetricId)
    },
    onSuccess
  })

// Alert
export const toggleAlertMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ['toggleAlertNotification'],
    mutationFn: async ({ alertId, isActive }: ToggleAlertNotification) => {
      await new ToggleAlertNotificationUsecase(alertAdapter).execute(alertId, isActive)
    },
    onSuccess
  })
}

export const deleteAlertMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ['deleteAlert'],
    mutationFn: async (alertId: string) => {
      await new DeleteActiveMetricAlertUsecase(alertAdapter).execute(alertId)
    },
    onSuccess
  })
}

export const getAlertFieldsQuery = (metricId: string) => {
  return useQuery({
    queryKey: ['getAlertFields'],
    queryFn: async (): Promise<Option[]> =>
      new GetAlertFieldsUsecase(dashboardMetricsAdapter).execute(metricId),
    initialData: () => []
  })
}
