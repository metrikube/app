import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';

import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { AlertUseCase } from '../application/use-cases/alert/alert.use-case';
import { CredentialUseCase } from '../application/use-cases/credential/credential.use-case';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { AlertController } from './alert/controllers/alert.controller';
import { AppController } from './app.controller';
import { PluginController } from './plugin/controllers/plugin.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AppController, PluginController, AlertController],
  providers: [
    { provide: 'CREDENTIAL_USE_CASE', useClass: CredentialUseCase },
    { provide: 'ALERT_USE_CASE', useClass: AlertUseCase },
    { provide: 'PLUGIN_USE_CASE', useClass: PluginUseCase },
    { provide: 'API_MONITORING', useClass: ApiMonitoringService },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl },
    { provide: 'DB_ANALYTICS_PLUGIN', useClass: DbAnalyticsPluginService }
  ]
})
export class ControllersModule {}
