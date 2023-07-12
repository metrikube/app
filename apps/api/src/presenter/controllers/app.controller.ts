import { AWSServiceType } from '@metrikube/common';

import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CredentialUseCaseInterface } from '../../domain/interfaces/use-cases/credential.use-case.interface';
import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../domain/models/credential.model';
import { Plugin } from '../../domain/models/plugin.model';
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

  @Get('/aws')
  getAWS(@Query('region') region: string, @Query('services') services: AWSServiceType[]): any {
    return this.pluginUseCase.getAWSPlugin().getServicesInformations(services, region);
  }

  @Post('db-plugin/connection')
  dbCreateConnection(@Body() payload: Credential): Promise<CredentialEntity> {
    return this.credentialUseCase.insertCredentialForPlugin(payload['plugin'], payload);
  }

  @Get('db-plugin/get-data')
  dbGetData(pluginId: Plugin['id']): any {
    return this.credentialUseCase.getDataDb(pluginId);
  }

  // @Get('/aws/cost-explorer')
  // getCosts(@Query('start') start: string, @Query('end') end: string, @Query('metrics') metrics: string[]): Promise<AWS.CostExplorer.GetCostAndUsageResponse> {
  //   const params: ICostExplorerParams = {
  //     timePeriod: {
  //       Start: start,
  //       End: end,
  //     },
  //     metrics: Array.isArray(metrics) ? metrics : [metrics],
  //   };
  //   console.log('params', params);
  //   return this.pluginUseCase.getCosts(params);
  //   // {
  //   //   TimePeriod: {
  //   //     Start: '2022-07-01',
  //   //     End: '2023-06-01',
  //   //   },
  //   //   Granularity: 'MONTHLY',
  //   //   Metrics: ['BlendedCost', 'UsageQuantity'],
  //   // }
  // }
}
