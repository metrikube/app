import { useAdapter } from '../config/axios'
import {
  WidgetModel,
  AlertModel,
  DeleteActiveMetricAlertUsecase,
  DeleteWidgetUsecase,
  GetActiveMetricAlertUsecase,
  GetWidgetsUsecase,
  GetAlertFieldsUsecase,
  Option,
  ToggleAlertNotification,
  ToggleAlertNotificationUsecase
} from '@metrikube/core'
import { useMutation, useQuery } from '@tanstack/react-query'

const { dashboardMetricsAdapter, alertAdapter } = useAdapter()

export const getWidgetsQuery = () => {
  return useQuery<WidgetModel[]>({
    queryKey: ['getWidgets'],
    queryFn: () => new GetWidgetsUsecase(dashboardMetricsAdapter).execute(),
    initialData: () => [],
    refetchOnWindowFocus: false
  })
}

export const getWidgetAlertsQuery = (widgetId: string) =>
  useQuery({
    queryKey: ['getWidgetAlerts'],
    queryFn: async (): Promise<AlertModel[]> =>
      new GetActiveMetricAlertUsecase(alertAdapter).execute(widgetId),
    initialData: () => [],
    refetchOnWindowFocus: false
  })

export const deleteWidgetMutation = (onSuccess: () => void) =>
  useMutation({
    mutationKey: ['deleteMetric'],
    mutationFn: async (widgetId: string) => {
      await new DeleteWidgetUsecase(dashboardMetricsAdapter).execute(widgetId)
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
    initialData: () => [],
    refetchOnWindowFocus: false
  })
}
