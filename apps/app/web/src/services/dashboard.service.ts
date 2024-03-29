import { useAdapter } from '../config/axios'
import {
  AlertModel,
  DeleteActiveMetricAlertUsecase,
  DeleteWidgetUsecase,
  GetActiveMetricAlertUsecase,
  GetAlertFieldsUsecase,
  Option,
  ToggleAlertNotification,
  ToggleAlertNotificationUsecase,
  ResetTriggeredAlertUsecase,
  WidgetModel,
  RefreshDashboardUsecase,
  NotificationModel,
  RefreshNotificationsUsecase
} from '@metrikube/core'
import { useMutation, useQuery } from '@tanstack/react-query'

const { dashboardMetricsAdapter, alertAdapter } = useAdapter()

export const GET_WIDGETS_QUERY_KEY = 'getWidgets'
export const GET_WIDGET_ALERTS_QUERY_KEY = 'getWidgetAlerts'

export const getWidgetAlertsQuery = (widgetId: string) =>
  useQuery({
    queryKey: [GET_WIDGET_ALERTS_QUERY_KEY],
    queryFn: async (): Promise<AlertModel[]> =>
      new GetActiveMetricAlertUsecase(alertAdapter).execute(widgetId),
    initialData: () => [],
    refetchOnWindowFocus: false
  })

export const getWidgetsQuery = (onSuccess: (widgets: WidgetModel[]) => void) =>
  useQuery({
    queryKey: [GET_WIDGETS_QUERY_KEY],
    queryFn: async (): Promise<WidgetModel[]> =>
      new RefreshDashboardUsecase(dashboardMetricsAdapter).execute(),
    initialData: () => [],
    refetchOnWindowFocus: false,
    onSuccess
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

export const resetTriggeredAlertMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ['resetTriggeredAlert'],
    mutationFn: async (alertId: string) => {
      await new ResetTriggeredAlertUsecase(alertAdapter).execute(alertId)
    },
    onSuccess
  })
}

export const getNotificationsQuery = (onSuccess: (notification: NotificationModel[]) => void) =>
  useQuery({
    queryKey: ['getNotifications'],
    queryFn: async (): Promise<NotificationModel[]> =>
      new RefreshNotificationsUsecase(dashboardMetricsAdapter).execute(),
    initialData: () => [],
    refetchOnWindowFocus: false,
    onSuccess
  })
