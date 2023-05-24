import { Controller, Get, Inject } from '@nestjs/common';
import { PluginUseCaseInterface } from "../../domain/interfaces/use-cases/plugin.use-case.interface";
import { Plugin } from "../../domain/models/plugin.model";

@Controller()
export class AppController {

  constructor(
    @Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface,
  ) {
  }

  @Get()
  getHello(): Promise<Plugin> {
    return this.pluginUseCase.getPluginById('1')
  }
}
