import { AlertModel, AlertRequest } from '@metrikube/core';

export type CreateAlertRequest = {
  pluginToMetricId: string;
  alerts: AlertRequest[];
};

export interface AlertAdapter {
  createAlert: (payload: CreateAlertRequest) => Promise<void>;
  getActiveMetricAlerts: (activeMetricId: string) => Promise<AlertModel[]>
  deleteActiveMetricAlert: (alertId: string) => Promise<void>
}
