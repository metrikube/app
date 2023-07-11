import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository'
import { AlertEntity } from '../entities/alert.entity'
import { BaseRepository } from './base.repository'

@Injectable()
export class AlertRepositoryImpl extends BaseRepository<AlertEntity> implements AlertRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, AlertEntity)
  }

  getAlerts(criterias: FindManyOptions<AlertEntity> | FindOptionsWhere<AlertEntity>): Promise<AlertEntity[]> {
    return this.find(criterias)
  }

  createAlert(payload): Promise<AlertEntity> {
    return this.save(payload)
  }
}
