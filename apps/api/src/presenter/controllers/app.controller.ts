import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { CredentialUseCaseInterface } from '../../domain/interfaces/use-cases/credential.use-case.interface';

import { Plugin } from '../../domain/models/plugin.model';
import { Credential } from '../../domain/models/credential.model';
import { PluginEntity } from '../../infrastructure/database/entities/plugin.entity';
import { CredentialEntity } from '../../infrastructure/database/entities/credential.entity';


@Controller('/')
export class AppController {
  constructor(
      @Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface,
      @Inject('CREDENTIAL_USE_CASE') private readonly credentialUseCase: CredentialUseCaseInterface
    ){}

  @Get()
  @ApiOperation({ summary: 'Get all plugins' })
  list(): Promise<PluginEntity[]> {
    return this.pluginUseCase.getPlugins();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new plugin' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: Plugin): Promise<PluginEntity> {
    return this.pluginUseCase.create(payload);
  }

  @Get('/aws/cost-explorer')
  @ApiOperation({ summary: 'Get AWS cost explorer' })
  getCosts(): any {
    return this.pluginUseCase.getAWSPlugin().getCostExplorerService().getCosts();
  }

  @Get('/aws/ec2')
  @ApiOperation({ summary: 'Get AWS EC2 instances' })
  getInstance(): any {
    return this.pluginUseCase.getAWSPlugin().getEc2Service('us-east-1').getInstances();
  }
  @Post('db-plugin/connection')
  dbCreateConnection(@Body() payload: Credential): Promise<CredentialEntity> {
    return this.credentialUseCase.dbCreateConnection(payload);
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

