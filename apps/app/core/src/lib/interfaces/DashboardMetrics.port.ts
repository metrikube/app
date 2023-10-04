import type { NotificationModel, WidgetModel } from '@metrikube/core';

export interface DashboardMetricsAdapter {
  getWidgets: () => EventSource
  getWidgetsHTTP: () => Promise<WidgetModel[]>
  getNotifications: () => EventSource
  getNotificationsHTTP: () => Promise<NotificationModel[]>
  deleteWidget: (widgetId: string) => Promise<void>
  getAlertFields: (metricId: string) => Promise<string[]>
}
