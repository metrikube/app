import { useAdapter } from '../config/axios'
import {
  ActiveMetricModel,
  AlertModel,
  DeleteActiveMetricAlertUsecase,
  DeleteActiveMetricUsecase,
  GetActiveMetricAlertUsecase,
  GetActiveMetricsUsecase,
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
  })
}

export const getActiveMetricAlertsQuery = (activeMetricId: string) =>
  useQuery({
    queryKey: ['getActiveMetricAlert'],
    queryFn: async (): Promise<AlertModel[]> =>
      new GetActiveMetricAlertUsecase(alertAdapter).execute(activeMetricId),
    initialData: () => []
  })

export const deleteMetricMutation = () =>
  useMutation({
    mutationKey: ['deleteMetric'],
    mutationFn: async (activeMetricId: string) => {
      await new DeleteActiveMetricUsecase(dashboardMetricsAdapter).execute(activeMetricId)
    }
  })

// Alert
export const toggleAlertMutation = () => {
  return useMutation({
    mutationKey: ['toggleAlertNotification'],
    mutationFn: async ({ alertId, isActive }: ToggleAlertNotification) => {
      await new ToggleAlertNotificationUsecase(alertAdapter).execute(alertId, isActive)
    }
  })
}

export const deleteAlertMutation = () => {
  return useMutation({
    mutationKey: ['deleteAlert'],
    mutationFn: async (alertId: string) => {
      await new DeleteActiveMetricAlertUsecase(alertAdapter).execute(alertId)
    }
  })
}
