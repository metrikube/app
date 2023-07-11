import { FindManyOptions, FindOptionsWhere } from 'typeorm'

import { MetricEntity } from '../../../infrastructure/database/entities/metric.entity'

export interface MetricRepository {
  /**
   * Get all the available metrics with criterias
   * @param criterias
   */
  getMetrics(criterias: FindManyOptions<MetricEntity> | FindOptionsWhere<MetricEntity>): Promise<MetricEntity[]>

  /**
   * Find all the available metric for a given plugin
   * @param pluginId
   * @returns {Promise<MetricEntity[]>} - List of deactivated metrics (do not display already active metrics, for this plugin)
   */
  findMetricByPluginId(pluginId: string): Promise<MetricEntity[]>

  /**
   * Find metric by id
   * @param criterias
   */
  findById(criterias: FindOptionsWhere<MetricEntity>): Promise<MetricEntity>

  /**
   * Activate widget with plugin
   * @param payload
   */
  activateWidget(pluginId: string, payload: { active: boolean }): Promise<MetricEntity>
}
