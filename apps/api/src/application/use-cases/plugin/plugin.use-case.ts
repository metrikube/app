import { AWSService } from '@metrikube/aws-plugin'

import { Inject, Injectable } from '@nestjs/common'

import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository'
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository'
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface'
import { Plugin } from '../../../domain/models/plugin.model'
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity'

@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {
  constructor(
    @Inject('PLUGIN_REPOSITORY') private readonly pluginRepository: PluginRepository,
    @Inject('CREDENTIAL_REPOSITORY') private readonly credentialRepository: CredentialRepository,
    @Inject('AWS_PLUGIN') private readonly AWSService: AWSService
  ) {}

  getPlugins(): Promise<PluginEntity[]> {
    return this.pluginRepository.getPlugins()
  }

  async create(plugin: Plugin): Promise<PluginEntity> {
    return this.pluginRepository.createPlugin(plugin)
  }

  getAWSPlugin() {
    return this.AWSService
  }
}
