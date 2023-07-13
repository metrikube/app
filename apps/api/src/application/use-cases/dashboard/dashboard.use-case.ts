import { Inject, Logger } from '@nestjs/common';

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { PluginToMetricRepository } from '../../../domain/interfaces/repository/plugin-to-metric.repository';
import { DashboardUseCaseInterface } from '../../../domain/interfaces/use-cases/dashboard.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';

export class DashboardUseCase implements DashboardUseCaseInterface {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(DiTokens.PluginToMetricRepositoryToken) private readonly pluginToMetricRepository: PluginToMetricRepository,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface
  ) {}

  async refreshDashboard(): Promise<any> {
    this.logger.log('refreshDashboard');

    const credentials = await this.credentialRepository.getCredentials();

    const configuredMetrics = await this.pluginToMetricRepository.getActiveMetrics({
      relations: {
        plugin: true,
        metric: true
      }
    });

    const metricCredentials = configuredMetrics.map((configuredMetric) => ({
      metricType: configuredMetric.metric.type,
      credential: credentials.find((credential) => credential.pluginId === configuredMetric.plugin.id)
    }));

    console.log('metricCredentials : ', metricCredentials);

    return {};
  }
}
