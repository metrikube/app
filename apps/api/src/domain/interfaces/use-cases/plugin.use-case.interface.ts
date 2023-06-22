// import { ICostExplorerParams } from 'common';
import { Plugin } from '../../../infrastructure/database/entities/plugin.entity';

export interface PluginUseCaseInterface {
  getPlugins(): Promise<Plugin[]>;
  getAWSPlugin(): any;
  create(plugin: Plugin): Promise<Plugin>;
}
