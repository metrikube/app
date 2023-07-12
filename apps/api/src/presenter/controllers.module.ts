import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { GithubService } from '@metrikube/github-plugin';

import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { AlertUseCase } from '../application/use-cases/alert/alert.use-case';
import { CredentialUseCase } from '../application/use-cases/credential/credential.use-case';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { AppController } from './controllers/app.controller';
import { PluginController } from './controllers/plugin.controller';
import { GithubController } from './controllers/github.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AppController, PluginController, GithubController],
  providers: [
    { provide: 'PLUGIN_USE_CASE', useClass: PluginUseCase },
    { provide: 'AWS_PLUGIN', useClass: AWSService },
    { provide: 'API_MONITORING', useClass: ApiMonitoringService },
    { provide: 'GITHUB_PLUGIN', useClass: GithubService },
    { provide: 'CREDENTIAL_USE_CASE', useClass: CredentialUseCase },
    { provide: 'PLUGIN_USE_CASE', useClass: PluginUseCase }
    // { provide: 'ALERT_USE_CASE', useClass: AlertUseCase },
    // { provide: 'AWS_PLUGIN', useClass: AWSService },
    // { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl }
  ]
})
export class ControllersModule {}
