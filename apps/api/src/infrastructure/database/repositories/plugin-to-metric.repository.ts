import { Promise } from 'cypress/types/cy-bluebird';
import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';

import { InjectDataSource } from '@nestjs/typeorm';

import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { PluginToMetricEntity } from '../entities/plugin_to_metric.entity';
import { BaseRepository } from './base.repository';

export class PluginToMetricRepositoryImpl extends BaseRepository<PluginToMetricEntity> implements PluginToMetricRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, PluginToMetricEntity);
  }

  createPluginToMetric(payload: { metricId: string; pluginId: string; isActivated: boolean; resourceId?: string }) {
    return this.save(payload);
  }

  getActiveMetrics(criterias: FindManyOptions<PluginToMetricEntity> | FindOptionsWhere<PluginToMetricEntity>): Promise<PluginToMetricEntity[]> {
    // @ts-ignore
    return this.find(criterias);
  }

  findPluginToMetricById(id: string): Promise<PluginToMetricEntity | undefined> {
    return this.findOne({
      where: { id },
      relations: {
        plugin: true,
        metric: true
      }
    }) as Promise<PluginToMetricEntity>;
  }
}