import { Metric, MetricThresholdOperator } from '@metrikube/common';

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
