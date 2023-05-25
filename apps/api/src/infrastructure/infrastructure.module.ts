import { Module } from "@nestjs/common";
import { PluginInMemoryRepositoryImpl } from "./database/in-memory/plugin-in-memory.repository";
import { DatabaseModule } from "./config/typeorm/database.module";
import { PluginRepositoryImpl } from "./database/repositories/plugin.repository";

@Module({
  imports: [DatabaseModule],
  providers: [PluginRepositoryImpl, PluginInMemoryRepositoryImpl],
  exports: [PluginRepositoryImpl, PluginInMemoryRepositoryImpl],
})
export class InfrastructureModule {
}
