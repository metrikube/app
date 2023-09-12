import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { AlertUseCase } from '../application/use-cases/alert/alert.use-case';
import { CredentialUseCase } from '../application/use-cases/credential/credential.use-case';
import { DashboardUseCase } from '../application/use-cases/dashboard/dashboard.use-case';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { DiTokens } from '../infrastructure/di/tokens';
import { AlertController } from './alert/controller/alert.controller';
import { CredentialController } from './credential/controller/credential.controller';
import { DashboardController } from './dashboard/controller/dashboard.controller';
import { MetricController } from './metric/controller/metric.controller';
import { PluginController } from './plugin/controller/plugin.controller';
import { WidgetController } from './widgets/controllers/widget.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AlertController, CredentialController, DashboardController, MetricController, PluginController, WidgetController],
  providers: [
    { provide: DiTokens.CredentialUseCaseToken, useClass: CredentialUseCase },
    { provide: DiTokens.AlertUseCaseToken, useClass: AlertUseCase },
    { provide: DiTokens.PluginUseCaseToken, useClass: PluginUseCase },
    { provide: DiTokens.DashboardUseCaseToken, useClass: DashboardUseCase }
  ]
})
export class ControllersModule {}
