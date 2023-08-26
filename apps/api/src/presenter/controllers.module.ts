import { Module } from '@nestjs/common';

import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';
import { GithubService } from '@metrikube/github-plugin';

import { UseCaseModule } from '../application/use-case.module';
import { AlertUseCase } from '../application/use-cases/alert/alert.use-case';
import { CredentialUseCase } from '../application/use-cases/credential/credential.use-case';
import { DashboardUseCase } from '../application/use-cases/dashboard/dashboard.use-case';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { DiTokens } from '../infrastructure/di/tokens';
import { AlertController } from './alert/controllers/alert.controller';
import { DashboardController } from './dashboard/controllers/dashboard.controller';
import { PluginController } from './plugin/controllers/plugin.controller';
import { DbAnalyticsController } from './controllers/db-analytics.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [PluginController, AlertController, DashboardController,  DbAnalyticsController],
  providers: [
    { provide: DiTokens.CredentialUseCaseToken, useClass: CredentialUseCase },
    { provide: DiTokens.AlertUseCaseToken, useClass: AlertUseCase },
    { provide: DiTokens.PluginUseCaseToken, useClass: PluginUseCase },
    { provide: DiTokens.ApiMonitoringToken, useClass: ApiMonitoringService },
    { provide: DiTokens.CredentialRepositoryToken, useClass: CredentialRepositoryImpl },
    { provide: DiTokens.GithubServiceToken, useClass: GithubService },
    { provide: DiTokens.AWSServiceToken, useClass: AWSService },
    { provide: DiTokens.DbAnalyticsPluginServiceToken, useClass: DbAnalyticsPluginService },
    { provide: DiTokens.DashboardUseCaseToken, useClass: DashboardUseCase }
  ]
})
export class ControllersModule {}
