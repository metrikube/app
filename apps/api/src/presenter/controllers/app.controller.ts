import { Controller, Get, Inject, Post, Query } from '@nestjs/common';

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Plugin } from '../../infrastructure/database/entities/plugin.entity';

@Controller()
export class AppController {
  constructor(@Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface) {}

  @Get()
  getHello(): Promise<Plugin[]> {
    return this.pluginUseCase.getPlugins();
  }

  @Post()
  create(): Promise<Plugin> {
    return this.pluginUseCase.create(new Plugin());
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
