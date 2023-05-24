import { Module } from '@nestjs/common';
import { UseCaseModule } from "./application/use-case.module";
import { PluginUseCase } from "./application/use-cases/plugin/plugin.use-case";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { AppController } from "./presenter/controllers/app.controller";

@Module({
  imports: [UseCaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
