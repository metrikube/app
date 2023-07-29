import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { MetricEntity } from '../entities/metric.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class MetricRepositoryImpl extends BaseRepository<MetricEntity> implements MetricRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, MetricEntity);
  }

  getMetrics(criterias: FindManyOptions<MetricEntity> | FindOptionsWhere<MetricEntity>): Promise<MetricEntity[]> {
    return this.find(criterias);
  }

  findById(criterias: FindOneOptions<MetricEntity> | FindOptionsWhere<MetricEntity>): Promise<MetricEntity> {
    return this.findOne(criterias);
  }

  findMetricByPluginId(pluginId: string): Promise<MetricEntity[]> {
    return this.find({ where: { plugin: { id: pluginId } } });
  }

  findMetricByType(pluginId: string, metricType: string): Promise<MetricEntity> {
    return this.findOne({
      where: { type: metricType, plugin: { id: pluginId } },
      relations: { pluginToMetrics: true }
    });
  }
}
