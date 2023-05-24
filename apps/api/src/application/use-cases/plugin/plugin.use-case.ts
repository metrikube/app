import { Inject, Injectable } from "@nestjs/common";
import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";
import { PluginUseCaseInterface } from "../../../domain/interfaces/use-cases/plugin.use-case.interface";
import { Plugin } from "../../../infrastructure/database/entities/plugin.entity";

@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {

  constructor(
    @Inject('PLUGIN_REPOSITORY') private readonly pluginRepository: PluginRepository,
  ) {}

  getPlugins(): Promise<Plugin[]> {
    return this.pluginRepository.getPlugins();
  }

  create(plugin: Plugin): Promise<Plugin> {
    return this.pluginRepository.createPlugin(plugin);
  }
}
