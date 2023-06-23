import { ICostExplorerParams } from '@metrikube/common';
import * as AWS from 'aws-sdk';

import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Plugin } from '../../domain/models/plugin.model';
import { PluginEntity } from '../../infrastructure/database/entities/plugin.entity';

@Controller('/')
export class AppController {
  constructor(@Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface) {}

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
  getCosts(): any {
    return this.pluginUseCase.getAWSPlugin().getCostExplorerService().getCosts();
  }

  @Get('/aws/ec2')
  getInstance(): any {
    return this.pluginUseCase.getAWSPlugin().getEc2Service('us-east-1').getInstances();
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
