import { FindManyOptions, FindOptionsWhere } from 'typeorm'

import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity'

export interface AlertRepository {
  getAlerts(criterias: FindManyOptions<AlertEntity> | FindOptionsWhere<AlertEntity>): Promise<AlertEntity[]>

  createAlert(payload): Promise<AlertEntity>
}
