import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';

import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { CredentialUseCase } from '../application/use-cases/credential/credential.use-case';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { AppController } from './controllers/app.controller';
import { PluginsController } from './controllers/plugins.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AppController, PluginsController],
  providers: [
    { provide: 'API_MONITORING', useClass: ApiMonitoringService },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'CREDENTIAL_USE_CASE', useClass: CredentialUseCase },
    { provide: 'PLUGIN_USE_CASE', useClass: PluginUseCase }
  ]
})
export class ControllersModule {}
