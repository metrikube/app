import { DataSource, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { Alert } from '../../../domain/models/alert.model';
import { AlertEntity } from '../entities/alert.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class AlertRepositoryImpl extends BaseRepository<AlertEntity> implements AlertRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, AlertEntity);
  }

  getAlerts(criterias: FindManyOptions<AlertEntity> | FindOptionsWhere<AlertEntity>): Promise<AlertEntity[]> {
    return this.find(criterias);
  }

  findAlertById(id: string): Promise<AlertEntity> {
    return this.findOne({ id });
  }

  createAlerts(payload: Partial<Alert[]>): Promise<AlertEntity[]> {
    return this.saveMany(payload);
  }

  async updateAlert(id: string, payload: Partial<AlertEntity>): Promise<void> {
    await this.update({ id }, payload);
  }

  async deleteAlert(alertId: string): Promise<void> {
    await this.delete({ id: alertId });
  }
}
