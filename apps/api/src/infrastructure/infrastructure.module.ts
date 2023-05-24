import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PluginInMemoryRepositoryImpl } from "./database/in-memory/plugin-in-memory.repository";
import { PluginRepositoryImpl } from "./database/typeorm/plugin.repository";

@Module({
  providers: [PluginInMemoryRepositoryImpl],
  imports: [],
  controllers: [],
  exports: [],
})
export class InfrastructureModule {
}
