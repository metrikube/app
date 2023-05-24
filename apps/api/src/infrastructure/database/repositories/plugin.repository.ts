import { Inject, Injectable } from "@nestjs/common";
import { Plugin } from "../entities/plugin.entity";

import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";


@Injectable()
export class PluginRepositoryImpl implements PluginRepository {

  constructor(
    @Inject('DB') private db: any,
  ) {
  }

  createPlugin(plugin: Plugin): Promise<Plugin> {
    return this.db.save(plugin);
  }

  getPlugins(): Promise<Plugin[]> {
    return Promise.resolve([]);
  }
}

