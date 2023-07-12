import { AWSService } from '@metrikube/aws-plugin';
import { MetricType, Plugin, PluginResult } from '@metrikube/common';
import { GithubService } from '@metrikube/github-plugin';

import { CredentialEntity } from '../../../infrastructure/database/entities/credential.entity';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { PluginResponseDto } from '../../../presenter/plugin/dtos/plugins.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/plugin/dtos/register-plugin.dto';

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
