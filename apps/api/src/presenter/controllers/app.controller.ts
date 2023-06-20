import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Plugin } from '../../domain/models/plugin.model';
import { PluginEntity } from '../../infrastructure/database/entities/plugin.entity';

@Controller('/')
export class AppController {
  constructor(@Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface) {}

  @Get()
  getHello(): Promise<PluginEntity[]> {
    return this.pluginUseCase.getPlugins();
  }

  @Post()
  create(@Body() payload: Plugin): Promise<PluginEntity> {
    return this.pluginUseCase.create(payload);
  }
}
