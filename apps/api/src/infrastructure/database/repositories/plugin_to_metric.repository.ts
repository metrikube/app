import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';

import { InjectDataSource } from '@nestjs/typeorm';

import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { PluginEntity } from '../entities/plugin.entity';
import { PluginToMetricEntity } from '../entities/plugin_to_metric.entity';
import { BaseRepository } from './base.repository';

export class PluginToMetricRepositoryImpl extends BaseRepository<PluginToMetricEntity> implements PluginToMetricRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, PluginToMetricEntity);
  }

  createPluginToMetric(payload: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }): Promise<PluginToMetricEntity> {
    return this.save(payload);
  }

  getActiveMetrics(criterias: FindManyOptions<PluginToMetricEntity> | FindOptionsWhere<PluginToMetricEntity>): Promise<PluginToMetricEntity[]> {
    return this.find(criterias);
  }

  getPluginToMetricById(pluginToMetricId: string): Promise<PluginToMetricEntity> {
    return this.findOne({
      where: {
        id: pluginToMetricId
      }
    });
  }
}
