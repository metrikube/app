import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { Alert } from '../../../domain/models/alert.model';
import { UpdateAlertDto } from '../../../presenter/alert/dtos/update-alert.dto';
import { AlertEntity } from '../entities/alert.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class AlertRepositoryImpl extends BaseRepository<AlertEntity> implements AlertRepository {
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, AlertEntity);
  }

  async getAlerts(): Promise<Alert[]> {
    const alerts = await this.find();
    return alerts.map(AlertEntity.toModel);
  }

  async findTriggeredAlerts(): Promise<Alert[]> {
    const alerts = await this.find({
      where: { isActive: true, triggered: true },
      relations: { widget: true }
    });

    return alerts.map(AlertEntity.toModelDetailed);
  }

  async findByWidgetId(widgetId: string): Promise<Alert[]> {
    const alerts = await this.find({ where: { widgetId } });
    return alerts.map(AlertEntity.toModel);
  }

  async findActiveAlertById(id: string): Promise<Alert> {
    const alert = await this.findOne({ where: { id, isActive: true } });
    return AlertEntity.toModel(alert);
  }

  async findAlertById(id: string): Promise<Alert> {
    const alert = await this.findOne({ where: { id } });
    return AlertEntity.toModel(alert);
  }

  async createAlerts(payload: Partial<Alert[]>): Promise<Alert[]> {
    const alerts = await this.saveMany(payload);
    return alerts.map(AlertEntity.toModel);
  }

  async updateAlert(id: string, payload: UpdateAlertDto): Promise<void> {
    await this.update({ id }, this.create(payload));
  }

  async deleteAlert(alertId: string): Promise<void> {
    await this.delete({ id: alertId });
  }
}
