import type { AlertModel, WidgetModel } from '@metrikube/core';

export interface DashboardMetricsAdapter {
  getWidgets: () => Promise<WidgetModel[]>;
  getNotifications: () => Promise<AlertModel[]>
  deleteWidget: (widgetId: string) => Promise<void>;
  getAlertFields: (metricId: string) => Promise<string[]>;
}
