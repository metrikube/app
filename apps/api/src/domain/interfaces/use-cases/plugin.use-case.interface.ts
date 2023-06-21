import { ICostExplorerParams } from 'common';

import { Plugin } from '../../../infrastructure/database/entities/plugin.entity';

export interface PluginUseCaseInterface {
  getPlugins(): Promise<Plugin[]>;
  getCosts(params: ICostExplorerParams): Promise<AWS.CostExplorer.GetCostAndUsageResponse>;
  getEc2Instances(params): Promise<AWS.EC2.DescribeInstancesResult>;
  create(plugin: Plugin): Promise<Plugin>;
}
