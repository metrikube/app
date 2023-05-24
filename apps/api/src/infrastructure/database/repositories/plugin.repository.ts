import {  Injectable } from "@nestjs/common";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Plugin } from "../entities/plugin.entity";

import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";


@Injectable()
export class PluginRepositoryImpl implements PluginRepository {
  db: Repository<Plugin>;

  constructor(
    @InjectDataSource() private readonly connection: DataSource,
  ) {
    this.db = connection.getRepository(Plugin);
  }

  createPlugin(plugin: Plugin): Promise<Plugin> {
    return this.db.save({ ...plugin, name: randomStringGenerator() });
  }

  getPlugins(): Promise<Plugin[]> {
    return this.db.manager.find(Plugin);
  }
}

