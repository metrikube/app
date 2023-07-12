import { ApiMonitoringModule, ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService, AwsPluginModule } from '@metrikube/aws-plugin';
import { DbAnalyticsPluginModule, DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';

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
  imports: [InfrastructureModule, AwsPluginModule, ApiMonitoringModule, DbAnalyticsPluginModule],
  providers: [
    { provide: 'ALERT_REPOSITORY', useClass: AlertRepositoryImpl },
    { provide: 'ALERT_USE_CASE', useClass: AlertUseCase },
    { provide: 'API_MONITORING', useClass: ApiMonitoringService },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl },
    { provide: 'DB_ANALYTICS_PLUGIN', useClass: DbAnalyticsPluginService },
    { provide: 'MAILER', useClass: NotificationService },
    { provide: 'PLUGIN_REPOSITORY', useClass: PluginRepositoryImpl },
    { provide: 'METRIC_REPOSITORY', useClass: MetricRepositoryImpl },
    { provide: 'PLUGIN_TO_METRIC_REPOSITORY', useClass: PluginToMetricRepositoryImpl }
  ],
  exports: [
    'ALERT_REPOSITORY',
    'ALERT_USE_CASE',
    'API_MONITORING',
    'AWS_PLUGIN',
    'CREDENTIAL_REPOSITORY',
    'DB_ANALYTICS_PLUGIN',
    'MAILER',
    'PLUGIN_REPOSITORY',
    'METRIC_REPOSITORY',
    'PLUGIN_TO_METRIC_REPOSITORY'
  ]
})
export class UseCaseModule {}
