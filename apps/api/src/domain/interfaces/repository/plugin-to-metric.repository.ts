import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { PluginToMetricEntity } from '../../../infrastructure/database/entities/plugin_to_metric.entity';

export interface PluginToMetricRepository {
  getActiveMetrics(criterias: FindManyOptions<PluginToMetricEntity> | FindOptionsWhere<PluginToMetricEntity>): Promise<PluginToMetricEntity[]>;

  createPluginToMetric(param: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }): Promise<PluginToMetricEntity>;

  findPluginToMetricById(id: string): Promise<PluginToMetricEntity | undefined>;
}
