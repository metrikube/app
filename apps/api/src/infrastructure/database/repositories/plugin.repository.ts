import { Inject, Injectable } from "@nestjs/common";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, EntitySchema, Repository } from "typeorm";
import { Plugin } from "../entities/plugin.entity";

import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";
import { BaseRepository } from "./base.repository";


@Injectable()
export class PluginRepositoryImpl extends BaseRepository<Plugin> implements PluginRepository {

  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, Plugin);
  }

  createPlugin(plugin: Plugin): Promise<Plugin> {
    return this.save({ ...plugin, name: randomStringGenerator() });
  }

  getPlugins(): Promise<Plugin[]> {
    return this.find();
  }
}

