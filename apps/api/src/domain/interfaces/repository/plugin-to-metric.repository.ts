import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';

export interface PluginToMetricRepository {
  getActiveMetricsWithRelations(): Promise<PluginToMetricEntity[]>;

  createPluginToMetric(pluginToMetric: Partial<Omit<PluginToMetricEntity, 'id'>>): Promise<PluginToMetricEntity>;

  findPluginToMetricById(id: string): Promise<PluginToMetricEntity | undefined>;

  disablePluginToMetric(pluginToMetricId: string): Promise<PluginToMetricEntity>;

  deleteWidget(id: string): Promise<void>;
}
