import { Test } from '@nestjs/testing';

import { MetricThresholdOperator, MetricThresholdOperatorEnum } from '@metrikube/common';

import { SchedulerInterface } from '../../../domain/interfaces/scheduler/scheduler.interface';
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
  let wigetRepository: WidgetInMemoryRepositoryImpl;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AlertUseCase,
        { provide: DiTokens.AlertRepositoryToken, useClass: AlertInMemoryRepositoryImpl },
        { provide: DiTokens.WidgetRepositoryToken, useClass: WidgetInMemoryRepositoryImpl },
        { provide: DiTokens.CredentialRepositoryToken, useClass: CredentialInMemoryRepositoryImpl },
        { provide: DiTokens.Mailer, useValue: { sendMail: jest.fn() } },
        { provide: DiTokens.Scheduler, useValue: { scheduleAlert: jest.fn() } },
        { provide: DiTokens.PluginUseCaseToken, useValue: {} },
        { provide: DiTokens.ApiMonitoringToken, useValue: {} }
      ]
    }).compile();

    useCase = module.get(AlertUseCase);
    alertRepository = module.get(DiTokens.AlertRepositoryToken);
    scheduler = module.get(DiTokens.Scheduler);
    wigetRepository = module.get(DiTokens.WidgetRepositoryToken);
  });

  it('should create alert', async () => {
    const alert = {
      metricId: 'metric-id',
      label: 'alert-name',
      condition: {
        field: 'field',
        operator: 'operator' as MetricThresholdOperator,
        threshold: 'threshold'
      }
    } as CreateAlertRequestDto;

    const createdAlert = await useCase.createAlertOnActivePlugin('1', [alert]);
    expect(createdAlert.alerts.length).toEqual(1);
  });

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
    alertRepository.alerts = [Object.assign(new AlertEntity(), { id: '1', alert })];

    await useCase.updateAlert('1', { label: 'new-alert-name' });
    const updatedAlert = await alertRepository.findAlertById('1');

    expect(updatedAlert.label).toEqual('new-alert-name');
  });

  it('should schedule and update alert when isActive is true', async () => {
    const alert: CreateAlertRequestDto = {
      label: 'alert-name',
      metricId: 'metric-id',
      condition: {
        field: 'field',
        operator: MetricThresholdOperatorEnum.GTE,
        threshold: 5
      }
    };

    await useCase.createAlertOnActivePlugin('1', [alert]);

    await useCase.updateAlert('1', { isActive: true });

    // spy on scheduler
    const spyScheduler = jest.spyOn(scheduler, 'scheduleAlert');

    expect(spyScheduler).toHaveBeenCalled();
  });

  it.todo('should unschedule and update alert when isActive is false');
});
