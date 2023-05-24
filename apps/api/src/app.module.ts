import { Module } from '@nestjs/common';
import { UseCaseModule } from "./application/use-case.module";
import { PluginUseCase } from "./application/use-cases/plugin/plugin.use-case";
import { PluginRepositoryImpl } from "./infrastructure/database/repositories/plugin.repository";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { AppController } from "./presenter/controllers/app.controller";

@Module({
  imports: [UseCaseModule, InfrastructureModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'PLUGIN_USE_CASE',
      useClass: PluginUseCase
    },
    {
      provide: 'PLUGIN_REPOSITORY',
      useClass: PluginRepositoryImpl
    }
  ],
})
export class AppModule {
}
