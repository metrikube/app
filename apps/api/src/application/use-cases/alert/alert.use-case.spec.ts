import { Test } from '@nestjs/testing';

import { Alert, MetricThresholdOperator } from '../../../domain/models/alert.model';
import { AlertInMemoryRepositoryImpl } from '../../../infrastructure/database/in-memory/alert-in-memory.repository';
import { AlertUseCase } from './alert.use-case';

describe('AlertUseCase', () => {
  let useCase: AlertUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AlertUseCase,
        {
          provide: 'ALERT_REPOSITORY',
          useClass: AlertInMemoryRepositoryImpl
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
      id: 'alert-id',
      label: 'alert-name',
      condition: {
        field: 'field',
        operator: 'operator',
        threshold: 'threshold'
      }
    } as unknown as Partial<Alert>;
    const metricId = 'metric-id';

    const createdAlert = await useCase.createAlert(metricId, alert);
    expect(createdAlert).toEqual(alert);
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
    const condition = {
      field: 'field',
      operator: 'gte' as MetricThresholdOperator,
      threshold: 5
    };

    const spy = jest.spyOn(useCase, 'checkConditionThreshold');
    await useCase.checkContiditionAndNotify(metricData, condition);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(metricData.field, condition.operator, condition.threshold);
  });
});
