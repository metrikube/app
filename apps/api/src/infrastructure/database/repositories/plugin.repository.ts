import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Plugin } from "../entities/plugin.entity";

import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";


@Injectable()
export class PluginRepositoryImpl implements PluginRepository {

  constructor(
    @Inject('DB') private db: Repository<Plugin>,
  ) {
  }

  createPlugin(plugin: Plugin): Promise<Plugin> {
    return this.db.save({
      name: 'TTESTTT'
    } as Plugin);
  }

  getPlugins(): Promise<Plugin[]> {
    return this.db.manager.find(Plugin);
  }
}

