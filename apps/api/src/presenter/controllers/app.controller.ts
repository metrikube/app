import { Controller, Get, Inject, Post } from '@nestjs/common';

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Plugin } from '../../infrastructure/database/entities/plugin.entity';

@Controller()
export class AppController {
  constructor(@Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface) {}

  @Get()
  getHello(): Promise<Plugin[]> {
    console.log('ici get');
    return this.pluginUseCase.getPlugins();
  }

  @Post()
  create(): Promise<Plugin> {
    console.log('ici post');
    return this.pluginUseCase.create(new Plugin());
  }
}
