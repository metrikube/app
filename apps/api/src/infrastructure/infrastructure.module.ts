import { Module } from '@nestjs/common';

import { DatabaseModule } from './config/typeorm/database.module';
import { PluginInMemoryRepositoryImpl } from './database/in-memory/plugin-in-memory.repository';
import { CredentialRepositoryImpl } from './database/repositories/credential.repository';
import { PluginRepositoryImpl } from './database/repositories/plugin.repository';

@Module({
  imports: [DatabaseModule],
  providers: [PluginRepositoryImpl, PluginInMemoryRepositoryImpl, CredentialRepositoryImpl],
  exports: [PluginRepositoryImpl, PluginInMemoryRepositoryImpl, CredentialRepositoryImpl]
})
export class InfrastructureModule {}
