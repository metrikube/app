import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { Plugin } from '@metrikube/common';

import { PluginResolverInterface } from '../../../domain/interfaces/common/plugin-resolver.interface';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { CredentialUseCaseInterface } from '../../../domain/interfaces/use-cases/credential.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../../domain/models/credential.model';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CredentialTypesDtos } from '../../../presenter/credential/dtos/validate-credential-response.dto';

@Injectable()
export class CredentialUseCase implements CredentialUseCaseInterface {
  constructor(
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface,
    @Inject(DiTokens.MetricRepositoryToken) private readonly metricRepository: MetricRepository,
    @Inject(DiTokens.PluginResolver) private readonly pluginResolver: PluginResolverInterface
  ) {}

  async insertCredentialForPlugin(pluginId: Plugin['id'], paylad: Credential): Promise<Credential> {
    return this.credentialRepository.createCredential({ pluginId, ...paylad });
  }

  async validateCredential(metricId: string, credential: CredentialTypesDtos): Promise<void> {
    try {
      const metric = await this.metricRepository.findById(metricId);

      await this.pluginResolver.testPluginConnection(metric.plugin, credential);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
