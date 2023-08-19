import { Test } from '@nestjs/testing';

import { MetricThresholdOperator } from '@metrikube/common';

import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { AlertInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/alert-in-memory.repository';
import { CredentialInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/credential-in-memory.repository';
import { PluginToMetricInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/plugin-to-metric-in-memory.repository';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CreateAlertRequestDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { AlertUseCase } from './alert.use-case';

describe('AlertUseCase', () => {
  let useCase: AlertUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AlertUseCase,
        { provide: DiTokens.AlertRepositoryToken, useClass: AlertInMemoryRepositoryImpl },
        { provide: DiTokens.PluginToMetricRepositoryToken, useClass: PluginToMetricInMemoryRepositoryImpl },
        { provide: DiTokens.CredentialRepositoryToken, useClass: CredentialInMemoryRepositoryImpl },
        { provide: DiTokens.Mailer, useValue: { sendMail: jest.fn() } },
        { provide: DiTokens.Scheduler, useValue: { scheduleAlert: jest.fn() } },
        { provide: DiTokens.PluginUseCaseToken, useValue: {} },
        { provide: DiTokens.ApiMonitoringToken, useValue: {} }
      ]
    }).compile();

    useCase = module.get(AlertUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeTruthy();
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
});
