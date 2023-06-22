import { AWSService } from '@metrikube/aws-plugin';

import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'PLUGIN_USE_CASE',
      useClass: PluginUseCase,
    },
    {
      provide: 'PLUGIN_REPOSITORY',
      useClass: PluginRepositoryImpl,
    },
    {
      provide: 'AWS_PLUGIN',
      useClass: AWSService,
    },
  ],
})
export class ControllersModule {}
