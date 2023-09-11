import type { WidgetModel } from '@metrikube/core';

export interface DashboardMetricsAdapter {
  getWidgets: () => Promise<WidgetModel[]>;
  deleteWidget: (widgetId: string) => Promise<void>;
  getAlertFields: (metricId: string) => Promise<string[]>;
}
