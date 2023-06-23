import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';

import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { AppController } from './controllers/app.controller';
import { PluginController } from './controllers/plugin.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AppController, PluginController],
  providers: [
    { provide: 'PLUGIN_USE_CASE', useClass: PluginUseCase },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'API_MONITORING', useClass: ApiMonitoringService },
    { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl }
  ]
})
export class ControllersModule {}
