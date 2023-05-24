import { Inject, Injectable } from "@nestjs/common";
import { PluginRepository } from "../../../domain/interfaces/repository/plugin.repository";
import { PluginUseCaseInterface } from "../../../domain/interfaces/use-cases/plugin.use-case.interface";


@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {
  constructor(
    @Inject('PLUGIN_REPOSITORY')private readonly pluginRepository: PluginRepository,
  ) {
  }

  getPluginById(id: string) {
    return this.pluginRepository.getPluginById(id);
  }
}
