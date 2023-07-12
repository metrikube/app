import { Plugin } from '@metrikube/common';

import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CredentialUseCaseInterface } from '../../domain/interfaces/use-cases/credential.use-case.interface';
import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../domain/models/credential.model';
import { CredentialEntity } from '../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../infrastructure/database/entities/plugin.entity';
import { PluginResponseDto } from '../dto/plugins.dto';

@Controller('/')
export class AppController {
  constructor(@Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface, @Inject('CREDENTIAL_USE_CASE') private readonly credentialUseCase: CredentialUseCaseInterface) {}

  @Get()
  @ApiOperation({ summary: 'Get all plugins' })
  list(): Promise<PluginResponseDto> {
    return this.pluginUseCase.listPlugins();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new plugin' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: Plugin): Promise<PluginEntity> {
    return this.pluginUseCase.create(payload);
  }

  @Post('db-plugin/connection')
  dbCreateConnection(@Body() payload: Credential): Promise<CredentialEntity> {
    return this.credentialUseCase.insertCredentialForPlugin(payload['pluginId'], payload);
  }

  @Get('db-plugin/get-data')
  dbGetData(pluginId: Plugin['id']): any {
    return this.credentialUseCase.getDataDb(pluginId);
  }
}
