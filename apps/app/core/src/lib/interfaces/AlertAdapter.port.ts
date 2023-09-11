import type { AlertModel, AlertRequest } from '@metrikube/core';

export type CreateAlertRequest = {
  pluginToMetricId: string;
  alerts: AlertRequest[];
};

export interface AlertAdapter {
  getWidgetAlerts: (widgetId: string) => Promise<AlertModel[]>
  createAlert: (payload: CreateAlertRequest) => Promise<void>;
  updateAlert: (alertId: string, payload: Partial<AlertModel>) => Promise<void>
  deleteAlert: (alertId: string) => Promise<void>
}
