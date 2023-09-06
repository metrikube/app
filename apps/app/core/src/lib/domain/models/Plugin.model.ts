import { Plugin, GenericCredentialType } from '@metrikube/common';

import { MetricModel } from './Metric.model';

export type PluginModel = Omit<Plugin, 'createdAt' | 'metrics'> & {
  metrics: MetricModel[];
};

export type ValidateCredentialsRequest = {
  metricId: string
  credentials: GenericCredentialType
}
