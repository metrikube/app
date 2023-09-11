import { Promise } from 'cypress/types/cy-bluebird';

import { Injectable } from '@nestjs/common';

import { PluginResolverInterface } from '../../../domain/interfaces/common/plugin-resolver.interface';

@Injectable()
export class PluginResolver implements PluginResolverInterface {
  resolvePlugin(pluginId: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  getConnecotr(type: string): unknown {
    throw new Error('Method not implemented.');
  }
}
