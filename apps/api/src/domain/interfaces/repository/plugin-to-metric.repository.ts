import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';

export interface PluginToMetricRepository {
  getActiveMetrics(): Promise<PluginToMetricEntity>;

  createPluginToMetric(param: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }): Promise<PluginToMetricEntity>;
}
