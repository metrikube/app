import { ApiMonitoringModule } from '@metrikube/api-monitoring'
import { AWSService, AwsPluginModule } from '@metrikube/aws-plugin'
import { DbAnalyticsPluginService, DbAnalyticsPluginModule } from '@metrikube/db-analytics-plugin'

import { Module } from '@nestjs/common'

import { AlertRepositoryImpl } from '../infrastructure/database/repositories/alert.repository'
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository'
import { MetricRepositoryImpl } from '../infrastructure/database/repositories/metric.repository'
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository'
import { InfrastructureModule } from '../infrastructure/infrastructure.module'
import { NotificationAdapter } from '../infrastructure/notification/notification.adapter'
import { AlertUseCase } from './use-cases/alert/alert.use-case'


@Module({
  imports: [InfrastructureModule, AwsPluginModule, ApiMonitoringModule, DbAnalyticsPluginModule],
  providers: [
    { provide: 'ALERT_REPOSITORY', useClass: AlertRepositoryImpl },
    { provide: 'ALERT_USE_CASE', useClass: AlertUseCase },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl },
    { provide: 'PLUGIN_REPOSITORY', useClass: PluginRepositoryImpl },
    { provide: 'METRIC_REPOSITORY', useClass: MetricRepositoryImpl },
    { provide: 'MAILER', useClass: NotificationAdapter },
    {provide: 'DB_ANALYTICS_PLUGIN', useClass: DbAnalyticsPluginService}
  ],
  exports: ['PLUGIN_REPOSITORY', 'ALERT_REPOSITORY', 'CREDENTIAL_REPOSITORY', 'AWS_PLUGIN', 'PLUGIN_REPOSITORY', 'ALERT_USE_CASE', 'METRIC_REPOSITORY', 'DB_ANALYTICS_PLUGIN']
})

export class UseCaseModule {}
