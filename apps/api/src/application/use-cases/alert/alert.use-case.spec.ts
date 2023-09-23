import { randomUUID } from 'crypto';

import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { MetricThresholdOperator, MetricThresholdOperatorEnum } from '@metrikube/common';

import { SchedulerInterface } from '../../../domain/interfaces/scheduler/scheduler.interface';
import { Alert } from '../../../domain/models/alert.model';
import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { AlertInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/alert-in-memory.repository';
import { CredentialInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/credential-in-memory.repository';
import { WidgetInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/widget-in-memory.repository';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CreateAlertRequestDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { AlertUseCase } from './alert.use-case';

describe('AlertUseCase', () => {
  let useCase: AlertUseCase;
  let alertRepository: AlertInMemoryRepositoryImpl;
  let scheduler: SchedulerInterface;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AlertUseCase,
        { provide: DiTokens.AlertRepositoryToken, useClass: AlertInMemoryRepositoryImpl },
        { provide: DiTokens.WidgetRepositoryToken, useClass: WidgetInMemoryRepositoryImpl },
        { provide: DiTokens.CredentialRepositoryToken, useClass: CredentialInMemoryRepositoryImpl },
        { provide: DiTokens.Mailer, useValue: { sendMail: jest.fn() } },
        { provide: DiTokens.Scheduler, useValue: { scheduleAlert: jest.fn(), unscheduleRelatedAlerts: jest.fn() } },
        { provide: DiTokens.PluginUseCaseToken, useValue: {} },
        { provide: DiTokens.ApiMonitoringToken, useValue: {} }
      ]
    }).compile();

    useCase = module.get(AlertUseCase);
    alertRepository = module.get(DiTokens.AlertRepositoryToken);
    scheduler = module.get(DiTokens.Scheduler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Creating alerts and crons', () => {
    it('should create alert and register an new cron job', async () => {
      // Arrange
      const spyScheduler = jest.spyOn(scheduler, 'scheduleAlert');
      const alert = {
        metricId: 'metric-id',
        label: 'alert-name',
        condition: {
          field: 'field',
          operator: 'operator' as MetricThresholdOperator,
          threshold: 'threshold'
        }
      } as CreateAlertRequestDto;

      // Act
      const createdAlert = await useCase.createAlertOnActivePlugin('1', [alert]);

      // Assert
      expect(createdAlert.alerts.length).toEqual(1);
      expect(createdAlert.alerts[0].widgetId).toEqual('1');
      expect(spyScheduler).toHaveBeenCalled();
      expect(spyScheduler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Check condition threshold', () => {
    it('should check condition threshold', () => {
      const value = 10;
      const operator = 'gte';
      const threshold = 5;

      expect(useCase.checkConditionThreshold(value, operator, threshold)).toEqual(true);
    });

    it('should throw error when invalid condition', () => {
      const value = 10;
      const operator = '>' as MetricThresholdOperator;
      const threshold = 5;

      expect(() => useCase.checkConditionThreshold(value, operator, threshold)).toThrowError();
    });

    it('should check condition and notify', async () => {
      const metricData = {
        field: 10
      };
      const alert = {
        label: 'alert-name',
        condition: {
          field: 'field',
          operator: 'gte' as MetricThresholdOperator,
          threshold: 5
        }
      } as CreateAlertRequestDto;

      await useCase.createAlertOnActivePlugin('1', [alert]);

      const spy = jest.spyOn(useCase, 'checkConditionThreshold');
      await useCase.checkContiditionAndNotify(metricData, Object.assign(new AlertEntity(), alert));
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(metricData.field, alert.condition.operator, alert.condition.threshold);
    });
  });

  describe('Update alerts', () => {
    it('should update alert when isActive is not in payload', async () => {
      const alert: CreateAlertRequestDto = {
        label: 'alert-name',
        metricId: 'metric-id',
        condition: {
          field: 'field',
          operator: MetricThresholdOperatorEnum.GTE,
          threshold: 5
        }
      };
      await alertRepository.createAlerts([new Alert('1', 'label', '1', false, false, null, alert.condition)]);
      await useCase.updateAlert('1', { label: 'new-alert-name' });
      const updatedAlert = await alertRepository.findAlertById('1');

      expect(updatedAlert.label).toEqual('new-alert-name');
    });

    it('should schedule and update alert when isActive is true', async () => {
      const spyScheduler = jest.spyOn(scheduler, 'scheduleAlert');
      const alert: CreateAlertRequestDto = {
        label: 'alert-name',
        metricId: 'metric-id',
        condition: {
          field: 'field',
          operator: MetricThresholdOperatorEnum.GTE,
          threshold: 5
        }
      };
      await alertRepository.createAlerts([new Alert('1', 'label', '1', false, false, null, alert.condition)]);

      await useCase.createAlertOnActivePlugin('1', [alert]);

      await useCase.updateAlert('1', { isActive: true });

      expect(spyScheduler).toHaveBeenCalled();
    });

    it('should unschedule and update alert when isActive is false', async () => {
      const spyUnscheduleRelatedAlerts = jest.spyOn(scheduler, 'unscheduleRelatedAlerts');

      const alertCondition: CreateAlertRequestDto['condition'] = {
        field: 'field',
        operator: MetricThresholdOperatorEnum.GTE,
        threshold: 5
      };

      const createdAlerts = await alertRepository.createAlerts([new Alert('1', 'label', '1', false, false, null, alertCondition)]);

      await useCase.updateAlert(createdAlerts[0].id, { isActive: false });

      expect(spyUnscheduleRelatedAlerts).toHaveBeenCalled();
      expect(spyUnscheduleRelatedAlerts).toHaveBeenCalledWith('1');
    });
  });

  describe('Deleting alerts and crons', () => {
    it('should delete an alert and unschedule the job', async () => {
      await alertRepository.createAlerts([new Alert('1', 'label', '1', false, false, null, { field: 'field', operator: MetricThresholdOperatorEnum.GTE, threshold: 5 })]);
      // Arrange
      const alertId = '1';
      const unscheduleSpy = jest.spyOn(scheduler, 'unscheduleRelatedAlerts');

      // Act
      await useCase.deleteAlert(alertId);

      // Assert
      expect(unscheduleSpy).toHaveBeenCalledWith(alertId);
      expect(alertRepository.alerts.length).toEqual(0);
    });
  });
});
