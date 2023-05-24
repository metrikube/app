import { Injectable } from "@nestjs/common";
import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";

import { Plugin } from "../../../domain/models/plugin.model";


@Injectable()
export class PluginInMemoryRepositoryImpl implements PluginRepository {
  db: any = [];

  constructor() {
  }

  createPlugin(plugin: Plugin): Promise<Plugin> {
    return Promise.resolve(plugin);
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
