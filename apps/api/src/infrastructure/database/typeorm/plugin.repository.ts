import { Injectable } from "@nestjs/common";

import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";

import { Plugin } from "../../../domain/models/plugin.model";


@Injectable()
export class PluginRepositoryImpl implements PluginRepository {

  constructor(
    private db: any,
  ) {
  }

  createPlugin(plugin: Plugin): Promise<Plugin> {
    return this.db.manager.save(plugin);
  }

  deletePlugin(id: string): Promise<Plugin> {
    return Promise.resolve(undefined);
  }

  getPluginById(id: string): Promise<Plugin> {
    return Promise.resolve(new Plugin('1', 'test'));
  }

  getPlugins(): Promise<Plugin[]> {
    return Promise.resolve([]);
  }

  updatePlugin(plugin: Plugin): Promise<Plugin> {
    return Promise.resolve(undefined);
  }
}
