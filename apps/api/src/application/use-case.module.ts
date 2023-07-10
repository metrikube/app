import { ApiMonitoringModule } from '@metrikube/api-monitoring';
import { AWSService, AwsPluginModule } from '@metrikube/aws-plugin';

import { Module } from '@nestjs/common';

import { AlertRepositoryImpl } from '../infrastructure/database/repositories/alert.repository';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AlertUseCase } from './use-cases/alert/alert.use-case';

@Module({
  imports: [InfrastructureModule, AwsPluginModule, ApiMonitoringModule],
  providers: [
    { provide: 'ALERT_REPOSITORY', useClass: AlertRepositoryImpl },
    { provide: 'ALERT_USE_CASE', useClass: AlertUseCase },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl },
    { provide: 'PLUGIN_REPOSITORY', useClass: PluginRepositoryImpl },
    { provide: 'METRIC_REPOSITORY', useClass: AlertRepositoryImpl }
  ],
  exports: ['PLUGIN_REPOSITORY', 'ALERT_REPOSITORY', 'CREDENTIAL_REPOSITORY', 'AWS_PLUGIN', 'PLUGIN_REPOSITORY', 'ALERT_USE_CASE', 'METRIC_REPOSITORY']
})
export class UseCaseModule {}
