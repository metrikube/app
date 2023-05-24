import { Module } from "@nestjs/common";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Plugin } from "./database/entities/plugin.entity";
import { PluginInMemoryRepositoryImpl } from "./database/in-memory/plugin-in-memory.repository";
import { DatabaseModule } from "./config/typeorm/database.module";
import { PluginRepositoryImpl } from "./database/repositories/plugin.repository";

@Module({
  imports: [DatabaseModule],
  providers: [
    PluginRepositoryImpl,
    PluginInMemoryRepositoryImpl,
    {
      provide: 'DB',
      inject: [DataSource],
      useFactory: (connection: DataSource) => connection.getRepository(Plugin),
    }
  ],
  exports: [
    PluginRepositoryImpl,
    PluginInMemoryRepositoryImpl,
    'DB'
  ],
})
export class InfrastructureModule {
}
