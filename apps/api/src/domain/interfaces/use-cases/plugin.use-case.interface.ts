import { GithubService } from '@metrikube/github-plugin';
import { AWSService } from '@metrikube/aws-plugin';
import { MetricType, PluginResult } from '@metrikube/common';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { Plugin } from '../../models/plugin.model';

export interface PluginUseCaseInterface {
  create(plugin: Plugin): Promise<PluginEntity>;

  getAWSPlugin(): AWSService;

  getPluginCredentials(pluginId: string): Promise<CredentialEntity>;

  getAWSPlugin(): any;

  getGithubPlugin(): GithubService;
  getPlugins(): Promise<Plugin[]>;

  refreshPluginMetric(pluginId: string, metric: string): PluginResult<MetricType>;
}
