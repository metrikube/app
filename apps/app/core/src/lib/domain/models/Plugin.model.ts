import { Plugin } from '@metrikube/common';

import { MetricModel } from './Metric.model';

export type PluginModel = Omit<Plugin, 'createdAt' | 'metrics'> & {
  metrics: MetricModel[];
};
