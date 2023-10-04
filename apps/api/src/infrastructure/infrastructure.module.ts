import { Module, Provider } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ApiMonitoringModule, ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService, AwsPluginModule } from '@metrikube/aws-plugin';
import { DbAnalyticsPluginModule, DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';
import { GithubPluginModule, GithubService } from '@metrikube/github-plugin';

import { DatabaseModule } from './config/typeorm/database.module';
import { AlertRepositoryImpl } from './database/repositories/alert.repository';
import { CredentialRepositoryImpl } from './database/repositories/credential.repository';
import { MetricRepositoryImpl } from './database/repositories/metric.repository';
import { PluginRepositoryImpl } from './database/repositories/plugin.repository';
import { WidgetRepositoryImpl } from './database/repositories/wiget.repository';
import { DiTokens } from './di/tokens';
import { EncryptionService } from './services/common/encryption.service';
import { PluginResolverService } from './services/common/plugin-resolver.service';
import { NotificationService } from './services/notification/notification.service';
import { SchedulerService } from './services/scheduler/scheduler.service';

const pluginsModules = [ApiMonitoringModule, AwsPluginModule, DbAnalyticsPluginModule, GithubPluginModule];

const infrastructureProviders: Provider[] = [
  // | Plugin Services
  // |
  // |
  // ---------------------------------------------------------------------------
  { provide: DiTokens.DbAnalyticsPluginServiceToken, useClass: DbAnalyticsPluginService },
  { provide: DiTokens.ApiMonitoringToken, useClass: ApiMonitoringService },
  { provide: DiTokens.AWSServiceToken, useClass: AWSService },
  { provide: DiTokens.GithubServiceToken, useClass: GithubService },
  // | Repositories
  // |
  // |
  // ---------------------------------------------------------------------------
  { provide: DiTokens.AlertRepositoryToken, useClass: AlertRepositoryImpl },
  { provide: DiTokens.CredentialRepositoryToken, useClass: CredentialRepositoryImpl },
  { provide: DiTokens.PluginRepositoryToken, useClass: PluginRepositoryImpl },
  { provide: DiTokens.MetricRepositoryToken, useClass: MetricRepositoryImpl },
  { provide: DiTokens.WidgetRepositoryToken, useClass: WidgetRepositoryImpl },
  // | Application Services
  // |
  // |
  // ---------------------------------------------------------------------------
  { provide: DiTokens.EncryptionService, useFactory: () => new EncryptionService(process.env.MASTER_PASSWORD) },
  { provide: DiTokens.Mailer, useClass: NotificationService },
  { provide: DiTokens.PluginResolver, useClass: PluginResolverService },
  { provide: DiTokens.Scheduler, useClass: SchedulerService }
];

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot(), ...pluginsModules],
  providers: infrastructureProviders,
  exports: infrastructureProviders
})
export class InfrastructureModule {}
