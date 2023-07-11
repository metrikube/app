// import { ICostExplorerParams } from 'common';
import { AWSService } from '@metrikube/aws-plugin';

import { Plugin } from '../../../infrastructure/database/entities/plugin.entity';

export interface PluginUseCaseInterface {
  getPlugins(): Promise<Plugin[]>;
  getAWSPlugin(): AWSService;
  create(plugin: Plugin): Promise<Plugin>;
}
