import { ApiMonitoringModule, ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService, AwsPluginModule } from '@metrikube/aws-plugin';
import { DbAnalyticsPluginService, DbAnalyticsPluginModule } from '@metrikube/db-analytics-plugin';


import { Module } from '@nestjs/common';

import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, AwsPluginModule, ApiMonitoringModule, DbAnalyticsPluginModule],
  providers: [
    {
      provide: 'PLUGIN_REPOSITORY',
      useClass: PluginRepositoryImpl
    },
    {
      provide: 'CREDENTIAL_REPOSITORY',
      useClass: CredentialRepositoryImpl
    },
    {
      provide: 'AWS_PLUGIN',
      useClass: AWSService
    },
    {
      provide: 'DB_ANALYTICS_PLUGIN',
      useClass: DbAnalyticsPluginService
    },
  ],
  exports: ['PLUGIN_REPOSITORY', 'CREDENTIAL_REPOSITORY']
})
export class UseCaseModule {}
