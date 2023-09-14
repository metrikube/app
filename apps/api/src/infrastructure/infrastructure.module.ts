import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from './config/typeorm/database.module';
import { AlertRepositoryImpl } from './database/repositories/alert.repository';
import { CredentialRepositoryImpl } from './database/repositories/credential.repository';
import { MetricRepositoryImpl } from './database/repositories/metric.repository';
import { PluginRepositoryImpl } from './database/repositories/plugin.repository';
import { WidgetRepositoryImpl } from './database/repositories/wiget.repository';
import { DiTokens } from './di/tokens';
import { EncryptionService } from './services/common/encryption.service';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  providers: [PluginRepositoryImpl, CredentialRepositoryImpl, AlertRepositoryImpl, MetricRepositoryImpl, CredentialRepositoryImpl, WidgetRepositoryImpl],
  exports: [PluginRepositoryImpl, CredentialRepositoryImpl, AlertRepositoryImpl, MetricRepositoryImpl, CredentialRepositoryImpl, WidgetRepositoryImpl]
})
export class InfrastructureModule {}
