import { Test } from '@nestjs/testing';

import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { AlertInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/alert-in-memory.repository';
import { CreateAlertRequestDto } from '../../../presenter/alert/dtos/create-alert.dto';
import { AlertUseCase } from './alert.use-case';
import { MetricThresholdOperator } from '@metrikube/common';

describe('AlertUseCase', () => {
  let useCase: AlertUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AlertUseCase,
        {
          provide: 'ALERT_REPOSITORY',
          useClass: AlertInMemoryRepositoryImpl
        },
        {
          provide: 'MAILER',
          useValue: { sendMail: jest.fn() }
        }
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
    const metricId = 'metric-id';

    const createdAlert = await useCase.createAlert(metricId, alert);
    expect(createdAlert.pluginToMetricId).toEqual('metric-id');
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

    const metricId = 'metric-id';

    await useCase.createAlert(metricId, alert);

    const spy = jest.spyOn(useCase, 'checkConditionThreshold');
    await useCase.checkContiditionAndNotify(metricData, Object.assign(new AlertEntity(), alert));
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(metricData.field, alert.condition.operator, alert.condition.threshold);
  });
});
