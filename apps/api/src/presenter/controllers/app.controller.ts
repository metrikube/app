import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AWSServiceType } from '../../../../../common/types/aws'
import { CredentialUseCaseInterface } from '../../domain/interfaces/use-cases/credential.use-case.interface'
import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface'
import { Credential } from '../../domain/models/credential.model'
import { Plugin } from '../../domain/models/plugin.model'
import { CredentialEntity } from '../../infrastructure/database/entities/credential.entity'
import { PluginEntity } from '../../infrastructure/database/entities/plugin.entity'

@Controller('/')
export class AppController {
  constructor(@Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface, @Inject('CREDENTIAL_USE_CASE') private readonly credentialUseCase: CredentialUseCaseInterface) {}

  @Get()
  @ApiOperation({ summary: 'Get all plugins' })
  list(): Promise<PluginEntity[]> {
    return this.pluginUseCase.getPlugins()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new plugin' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: Plugin): Promise<PluginEntity> {
    return this.pluginUseCase.create(payload)
  }

  @Get('/aws')
  getAWS(@Query('region') region: string, @Query('services') services: AWSServiceType[]): any {
    return this.pluginUseCase.getAWSPlugin().getServicesInformations(services, region)
  }
}
