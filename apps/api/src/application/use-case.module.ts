import { Module } from '@nestjs/common';

import { ApiMonitoringModule, ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService, AwsPluginModule } from '@metrikube/aws-plugin';
import { DbAnalyticsPluginModule, DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';
import { GithubPluginModule, GithubService } from '@metrikube/github-plugin';

import { AlertRepositoryImpl } from '../infrastructure/database/repositories/alert.repository';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { MetricRepositoryImpl } from '../infrastructure/database/repositories/metric.repository';
import { PluginToMetricRepositoryImpl } from '../infrastructure/database/repositories/plugin-to-metric.repository';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { DiTokens } from '../infrastructure/di/tokens';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { SchedulerService } from '../infrastructure/scheduler/scheduler.service';
import { NotificationService } from '../infrastructure/services/notification/notification.service';
import { AlertUseCase } from './use-cases/alert/alert.use-case';
import { CredentialUseCase } from './use-cases/credential/credential.use-case';
import { DashboardUseCase } from './use-cases/dashboard/dashboard.use-case';
import { PluginUseCase } from './use-cases/plugin/plugin.use-case';

@Module({
  imports: [InfrastructureModule, AwsPluginModule, ApiMonitoringModule, DbAnalyticsPluginModule, GithubPluginModule],
  providers: [
    { provide: DiTokens.AlertUseCaseToken, useClass: AlertUseCase },
    { provide: DiTokens.PluginUseCaseToken, useClass: PluginUseCase },
    { provide: DiTokens.DashboardUseCaseToken, useClass: DashboardUseCase },
    { provide: DiTokens.CredentialUseCaseToken, useClass: CredentialUseCase },

    { provide: DiTokens.AlertRepositoryToken, useClass: AlertRepositoryImpl },
    { provide: DiTokens.CredentialRepositoryToken, useClass: CredentialRepositoryImpl },
    { provide: DiTokens.PluginRepositoryToken, useClass: PluginRepositoryImpl },
    { provide: DiTokens.MetricRepositoryToken, useClass: MetricRepositoryImpl },
    { provide: DiTokens.PluginToMetricRepositoryToken, useClass: PluginToMetricRepositoryImpl },

    { provide: DiTokens.DbAnalyticsPluginServiceToken, useClass: DbAnalyticsPluginService },
    { provide: DiTokens.ApiMonitoringToken, useClass: ApiMonitoringService },
    { provide: DiTokens.AWSServiceToken, useClass: AWSService },
    { provide: DiTokens.GithubServiceToken, useClass: GithubService },

    { provide: DiTokens.Mailer, useClass: NotificationService },
    { provide: DiTokens.Scheduler, useClass: SchedulerService }
  ],
  exports: [
    DiTokens.AWSServiceToken,
    DiTokens.AlertRepositoryToken,
    DiTokens.AlertUseCaseToken,
    DiTokens.ApiMonitoringToken,
    DiTokens.CredentialRepositoryToken,
    DiTokens.DbAnalyticsPluginServiceToken,
    DiTokens.GithubServiceToken,
    DiTokens.Mailer,
    DiTokens.MetricRepositoryToken,
    DiTokens.PluginRepositoryToken,
    DiTokens.PluginToMetricRepositoryToken,
    DiTokens.Scheduler
    // DiTokens.DashboardUseCaseToken
  ]
})
export class UseCaseModule {}
