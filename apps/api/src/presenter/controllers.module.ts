import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';

import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { CredentialUseCase } from '../application/use-cases/credential/credential.use-case';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { AppController } from './controllers/app.controller';
import { PluginsController } from './controllers/plugins.controller';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';

@Module({
  imports: [UseCaseModule],
  controllers: [AppController, PluginsController],
  providers: [
    { provide: 'API_MONITORING', useClass: ApiMonitoringService },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'CREDENTIAL_USE_CASE', useClass: CredentialUseCase },
    { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl },
    { provide: 'DB_ANALYTICS_PLUGIN', useClass: DbAnalyticsPluginService },
    { provide: 'PLUGIN_USE_CASE', useClass: PluginUseCase }
  ]
})
export class ControllersModule {}
