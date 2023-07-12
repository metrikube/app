import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';

export interface PluginToMetricRepository {
  getActiveMetrics(): Promise<unknown>;

  createPluginToMetric(param: { metricId: string; pluginId: string; isActivated: boolean; ressourceId?: string }): Promise<PluginToMetricEntity>;
}
