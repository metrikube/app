import { Controller, Get, Inject, Post } from '@nestjs/common';

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Plugin } from '../../infrastructure/database/entities/plugin.entity';

@Controller('/')
export class AppController {
  constructor(@Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface) {}

  @Get()
  getHello(): Promise<Plugin[]> {
    return this.pluginUseCase.getPlugins();
  }

  @Post()
  create(): Promise<Plugin> {
    return this.pluginUseCase.create(new Plugin());
  }
}
