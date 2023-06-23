import { ICostExplorerParams } from '@metrikube/common';
import * as AWS from 'aws-sdk';

import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({})
  getHello(): Promise<PluginEntity[]> {
    return this.pluginUseCase.getPlugins();
  }

  @Post()
  create(@Body() payload: Plugin): Promise<PluginEntity> {
    return this.pluginUseCase.create(payload);
  }

  @Get('/aws/cost-explorer')
  getCosts(@Query('start') start: string, @Query('end') end: string, @Query('metrics') metrics: string[]): Promise<AWS.CostExplorer.GetCostAndUsageResponse> {
    const params: ICostExplorerParams = {
      timePeriod: {
        Start: start,
        End: end
      },
      metrics: Array.isArray(metrics) ? metrics : [metrics]
    };
    console.log('params', params);
    return this.pluginUseCase.getCosts(params);
    // {
    //   TimePeriod: {
    //     Start: '2022-07-01',
    //     End: '2023-06-01',
    //   },
    //   Granularity: 'MONTHLY',
    //   Metrics: ['BlendedCost', 'UsageQuantity'],
    // }
  }

  @Get('aws/ec2')
  getEc2Instances(): Promise<AWS.EC2.DescribeInstancesResult> {
    console.log('getEc2Instances from controller');
    return this.pluginUseCase.getEc2Instances({});
  }
  @Post('db-plugin/connection')
  dbCreateConnection(@Body() payload: Credential): Promise<CredentialEntity> {
    return this.credentialUseCase.dbCreateConnection(payload);
  }
}

