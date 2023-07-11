import { Controller, Get, Inject, Post, Query } from '@nestjs/common';

import { AWSServiceType } from '../../../../../common/types/aws';
import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Plugin } from '../../infrastructure/database/entities/plugin.entity';

@Controller()
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

  @Get('/aws')
  getAWS(@Query('region') region: string, @Query('services') services: AWSServiceType[]): any {
    return this.pluginUseCase.getAWSPlugin().getServicesInformations(services, region);
  }
}
