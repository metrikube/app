import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';

export interface PluginToMetricRepository {
  getActiveMetricsWithRelations(): Promise<PluginToMetricEntity[]>;

  createPluginToMetric(param: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }): Promise<PluginToMetricEntity>;

  findPluginToMetricById(id: string): Promise<PluginToMetricEntity | undefined>;

  disablePluginToMetric(pluginToMetricId: string): Promise<PluginToMetricEntity>;
}
