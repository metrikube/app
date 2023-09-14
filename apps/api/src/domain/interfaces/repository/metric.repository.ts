import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import { MetricType } from '@metrikube/common';

import { MetricEntity } from '../../../infrastructure/database/entities/metric.entity';
import { Metric } from '../../models/metric.model';

export interface MetricRepository {
  /**
   * Get all the available metrics with criterias
   * @param criterias
   */
  getMetrics(criterias?: FindManyOptions<MetricEntity> | FindOptionsWhere<MetricEntity>): Promise<Metric[]>;

  /**
   * Find all the available metric for a given plugin
   * @param pluginId
   * @returns {Promise<Metric[]>} - List of deactivated metrics (do not display already active metrics, for this plugin)
   */
  findMetricByPluginId(pluginId: string): Promise<Metric[]>;

  /**
   * Find metric by id
   * @param id
   */
  findById(id: string): Promise<Metric>;

  // /**
  //  * Activate widget with plugin
  //  * @param payload
  //  */
  // activateWidget(pluginId: string, payload: { active: boolean }): Promise<Metric>;
  // async;

  findMetricByType(pluginId: string, metricType: MetricType): Promise<Metric>;
}
