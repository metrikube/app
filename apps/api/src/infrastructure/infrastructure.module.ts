import { Module } from '@nestjs/common';

import { DatabaseModule } from './config/typeorm/database.module';
import { PluginInMemoryRepositoryImpl } from './database/in-memory/plugin-in-memory.repository';
import { AlertRepositoryImpl } from './database/repositories/alert.repository';
import { CredentialRepositoryImpl } from './database/repositories/credential.repository';
import { MetricRepositoryImpl } from './database/repositories/metric.repository';
import { PluginRepositoryImpl } from './database/repositories/plugin.repository';

@Module({
  imports: [DatabaseModule],
  providers: [PluginRepositoryImpl, PluginInMemoryRepositoryImpl, CredentialRepositoryImpl, AlertRepositoryImpl, MetricRepositoryImpl],
  exports: [PluginRepositoryImpl, PluginInMemoryRepositoryImpl, CredentialRepositoryImpl, AlertRepositoryImpl, MetricRepositoryImpl]
})
export class InfrastructureModule {}
