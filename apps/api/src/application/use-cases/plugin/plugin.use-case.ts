import { ICostExplorerParams } from '@metrikube/common';

import { Inject, Injectable } from '@nestjs/common';

import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Plugin } from '../../../infrastructure/database/entities/plugin.entity';

@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {
  constructor(@Inject('PLUGIN_REPOSITORY') private readonly pluginRepository: PluginRepository, @Inject('COST_EXPLORER_SERVICE') private readonly costExplorerService: any, @Inject('EC2_SERVICE') private readonly ec2Service) {}

  getPlugins(): Promise<Plugin[]> {
    return this.pluginRepository.getPlugins();
  }

  create(plugin: Plugin): Promise<Plugin> {
    return this.pluginRepository.createPlugin(plugin);
  }

  getCosts(params: ICostExplorerParams): Promise<AWS.CostExplorer.GetCostAndUsageResponse> {
    console.log('getCosts from use-case');
    return this.costExplorerService.getCosts(params);
  }

  getEc2Instances(params: AWS.EC2.DescribeInstancesRequest): Promise<AWS.EC2.DescribeInstancesResult> {
    console.log('getEc2Instances from use-case');
    return this.ec2Service.getInstances(params);
  }
}
