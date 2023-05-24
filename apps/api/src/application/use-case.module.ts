import { Module } from "@nestjs/common";
import { PluginInMemoryRepositoryImpl } from "../infrastructure/database/in-memory/plugin-in-memory.repository";
import { PluginRepositoryImpl } from "../infrastructure/database/typeorm/plugin.repository";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { PluginUseCase } from "./use-cases/plugin/plugin.use-case";


@Module({
  imports: [InfrastructureModule],
  providers: [
    PluginUseCase,
    {
      provide: 'PLUGIN_REPOSITORY',
      useClass: PluginInMemoryRepositoryImpl
    }
  ],
  exports: ['PLUGIN_REPOSITORY'],
})
export class UseCaseModule {}
