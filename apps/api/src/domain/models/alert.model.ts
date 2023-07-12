import { Metric } from '@metrikube/common';

export type MetricThresholdOperator = 'gt' | 'lt' | 'eq' | 'neq' | 'gte' | 'lte';
export enum MetricThresholdOperatorEnum {
  GT = 'gt',
  LT = 'lt',
  EQ = 'eq',
  NEQ = 'neq',
  GTE = 'gte',
  LTE = 'lte'
}

export type Alert = {
  readonly id: string;
  readonly label: string;
  readonly metric?: Metric;
  readonly metricId?: string;
  readonly pluginToMetricId: string;
  readonly triggered?: boolean;
  readonly condition: {
    field: string; // 'value' | 'status'
    operator: MetricThresholdOperator;
    threshold: string | number;
  };
  readonly createdAt: Date;
};
