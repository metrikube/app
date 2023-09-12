import { Metric } from '@metrikube/common';

export type MetricModel = Omit<Metric, 'createdAt'>;
