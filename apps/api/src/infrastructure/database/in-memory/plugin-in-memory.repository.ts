import { Injectable } from "@nestjs/common";
import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";

import { Plugin } from "../entities/plugin.entity";


@Injectable()
export class PluginInMemoryRepositoryImpl implements PluginRepository {
  db: Plugin[] = [];

  constructor() {}

  createPlugin(plugin: Plugin): Promise<Plugin> {
    return Promise.resolve(plugin);
  }

  getPlugins(): Promise<Plugin[]> {
    return Promise.resolve([]);
  }
}
