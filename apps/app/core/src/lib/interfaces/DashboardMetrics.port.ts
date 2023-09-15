import type { AlertModel, WidgetModel } from '@metrikube/core';

export interface DashboardMetricsAdapter {
  getWidgets: () => EventSource;
  getNotifications: () => Promise<AlertModel[]>
  deleteWidget: (widgetId: string) => Promise<void>;
  getAlertFields: (metricId: string) => Promise<string[]>;
}
