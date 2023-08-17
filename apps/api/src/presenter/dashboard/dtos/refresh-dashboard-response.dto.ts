import { Metric, MetricType, PluginResult } from '@metrikube/common';

export class RefreshDashboardResponseDto {
  metrics: { [key in MetricType]: Metric & PluginResult<MetricType> };

  constructor(metricsData: unknown) {
    this.metrics = metricsData as { [key in MetricType]: Metric & PluginResult<MetricType> };
  }
}
