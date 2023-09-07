import { Inject, Logger } from '@nestjs/common';

import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { SchedulerInterface } from '../../../domain/interfaces/scheduler/scheduler.interface';
import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { WidgetUsecaseInterface } from '../../../domain/interfaces/use-cases/widget.usecase.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';

export class WidgetUsecase implements WidgetUsecaseInterface {
  logger: Logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DiTokens.PluginToMetricRepositoryToken) private readonly widgetRepository: PluginToMetricRepository,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface,
    @Inject(DiTokens.AlertUseCaseToken) private readonly alertUsecase: AlertUseCaseInterface
  ) {}

  async deleteWidget(id: string): Promise<void> {
    await this.widgetRepository.deleteWidget(id);
    const alerts = await this.alertUsecase.getPluginToMetricAlerts(id);
    if (!alerts.length) return;
    await Promise.all(alerts.map((alert) => this.alertUsecase.deleteAlert(alert.id)));
  }
}
