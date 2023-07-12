import { ApiMonitoringModule, ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService, AwsPluginModule } from '@metrikube/aws-plugin';
import { DbAnalyticsPluginModule, DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';
import { GithubPluginModule, GithubService } from '@metrikube/github-plugin';
import { Module } from '@nestjs/common';
import { AlertRepositoryImpl } from '../infrastructure/database/repositories/alert.repository';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { MetricRepositoryImpl } from '../infrastructure/database/repositories/metric.repository';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { PluginToMetricRepositoryImpl } from '../infrastructure/database/repositories/plugin_to_metric.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { NotificationService } from '../infrastructure/services/notification/notification.service';
import { AlertUseCase } from './use-cases/alert/alert.use-case';


@Module({
  imports: [InfrastructureModule, AwsPluginModule, ApiMonitoringModule, DbAnalyticsPluginModule, GithubPluginModule],
  providers: [
    { provide: 'ALERT_REPOSITORY', useClass: AlertRepositoryImpl },
    { provide: 'ALERT_USE_CASE', useClass: AlertUseCase },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl },
    { provide: 'PLUGIN_REPOSITORY', useClass: PluginRepositoryImpl },
    { provide: 'METRIC_REPOSITORY', useClass: MetricRepositoryImpl },
    { provide: 'PLUGIN_TO_METRIC_REPOSITORY', useClass: PluginToMetricRepositoryImpl },
    { provide: 'API_MONITORING', useClass: ApiMonitoringService },
    { provide: 'MAILER', useClass: NotificationService },
    { provide: 'GITHUB_PLUGIN', useClass: GithubService },
    { provide: 'PLUGIN_TO_METRIC_REPOSITORY', useClass: PluginToMetricRepositoryImpl },
    { provide: 'DB_ANALYTICS_PLUGIN', useClass: DbAnalyticsPluginService }
  ],
  exports: [
    'PLUGIN_REPOSITORY',
    'ALERT_REPOSITORY',
    'CREDENTIAL_REPOSITORY',
    'AWS_PLUGIN',
    'PLUGIN_REPOSITORY',
    'ALERT_USE_CASE',
    'METRIC_REPOSITORY',
    'PLUGIN_TO_METRIC_REPOSITORY',
    'DB_ANALYTICS_PLUGIN'
  ]
})
export class UseCaseModule {}
