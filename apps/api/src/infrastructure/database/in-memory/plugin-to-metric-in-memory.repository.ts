import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { PluginToMetricEntity } from '../entities/plugin_to_metric.entity';

export class PluginToMetricInMemoryRepositoryImpl implements PluginToMetricRepository {
  pluginToMetrics = [
    { id: '1', isActive: true, metricId: 'metric-id', pluginId: 'plugin-id', resourceId: 'resource-id', plugin: { name: 'test-plugin' }, metric: { name: 'test-metric' } }
  ] as PluginToMetricEntity[];

  constructor() {}

  createPluginToMetric(param: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }): Promise<PluginToMetricEntity> {
    const pluginToMetric = {
      id: '1',
      isActive: true,
      metricId: 'metric-id',
      pluginId: 'plugin-id',
      resourceId: param?.resourceId
    } as PluginToMetricEntity;
    this.pluginToMetrics.push(pluginToMetric);
    return Promise.resolve(pluginToMetric as PluginToMetricEntity);
  }

  findPluginToMetricById(id: string): Promise<PluginToMetricEntity> {
    return Promise.resolve(this.pluginToMetrics.find((pluginToMetric) => pluginToMetric.id === id));
  }

  getActiveMetrics(criterias: FindManyOptions<PluginToMetricEntity> | FindOptionsWhere<PluginToMetricEntity>): Promise<PluginToMetricEntity[]> {
    return Promise.resolve(this.pluginToMetrics);
  }
}
