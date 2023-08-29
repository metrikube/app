import { MetricThresholdOperator } from '@metrikube/common';

export type AlertModel = {
  readonly id: string;
  readonly label: string;
  readonly metricId?: string;
  readonly isActive: boolean;
  readonly triggered?: boolean;
  readonly condition: {
    field: string;
    operator: MetricThresholdOperator;
    threshold: string | number;
  };
};
export type AlertRequest = Omit<AlertModel, 'id'>;
export type AlertForm = Omit<AlertModel, 'id' | 'metricId'>;

export type ToggleAlertNotification = {
  alertId: string
  isActive: boolean
}