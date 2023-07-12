import { GithubService } from '@metrikube/github-plugin';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { Plugin } from '../../models/plugin.model';



export interface PluginUseCaseInterface {
  getPlugins(): Promise<PluginEntity[]>;

  create(plugin: Plugin): Promise<PluginEntity>;

  // getCosts(params: ICostExplorerParams): Promise<AWS.CostExplorer.GetCostAndUsageResponse>;

  // getEc2Instances(params): Promise<AWS.EC2.DescribeInstancesResult>;

  getAWSPlugin(): any;

  getGithubPlugin(): GithubService;
}
