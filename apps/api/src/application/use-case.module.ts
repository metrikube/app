import { Module } from "@nestjs/common";

import { PluginRepositoryImpl } from "../infrastructure/database/repositories/plugin.repository";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";


@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: 'PLUGIN_REPOSITORY',
      useClass: PluginRepositoryImpl
    }
  ],
  exports: [],
})
export class UseCaseModule {}
