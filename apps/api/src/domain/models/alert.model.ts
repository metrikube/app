import { Metric } from './metric.model';

export type MetricThresholdOperator = 'gt' | 'lt' | 'eq' | 'neq' | 'gte' | 'lte';

export type Alert = {
  readonly id: string;
  readonly label: string;
  readonly metric: Metric;
  readonly metricId: string;
  readonly triggered: boolean;
  readonly condition: {
    field: string; // 'value' | 'status'
    operator: MetricThresholdOperator;
    threshold: string | number;
  };
  readonly createdAt: Date;
};
