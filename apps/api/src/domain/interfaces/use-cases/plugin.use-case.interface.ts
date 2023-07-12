import { GithubService } from '@metrikube/github-plugin';
import { AWSService } from '@metrikube/aws-plugin';
import { MetricType, Plugin, PluginResult } from '@metrikube/common';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { PluginResponseDto, RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/dto/plugins.dto';

export interface PluginUseCaseInterface {
  create(plugin: Plugin): Promise<PluginEntity>;

  getAWSPlugin(): AWSService;

  getPluginCredentials(pluginId: string): Promise<CredentialEntity>;

  getAWSPlugin(): any;

  getGithubPlugin(): GithubService;

  listPlugins(): Promise<PluginResponseDto>;

  refreshPluginMetric(pluginId: string, metric: string): PluginResult<MetricType>;

  registerPlugin(body: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto>;
}
