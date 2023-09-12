import { ApiAWSSingleResourceInstanceResult, ApiGithubIssues, ApiHealthCheckResult } from '@metrikube/common';
import { MetricModel, PluginModel } from '@metrikube/core';

export type WidgetModel = {
  id: string;
  name: string;
  resourceId?: string;
  alertNumber: number;
  plugin: Pick<PluginModel, 'id' | 'name' | 'type' | 'description'>;
  metric: Pick<MetricModel, 'id' | 'name' | 'type' | 'isNotifiable'>;
  data: ApiHealthCheckResult | ApiAWSSingleResourceInstanceResult;
};
