import { Module, Provider } from '@nestjs/common';

import { DiTokens } from '../infrastructure/di/tokens';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AlertUseCase } from './use-cases/alert/alert.use-case';
import { CredentialUseCase } from './use-cases/credential/credential.use-case';
import { DashboardUseCase } from './use-cases/dashboard/dashboard.use-case';
import { PluginUseCase } from './use-cases/plugin/plugin.use-case';
import { WidgetUsecase } from './use-cases/widget/widget.usecase';

const useCaseProviders: Provider[] = [
  { provide: DiTokens.AlertUseCaseToken, useClass: AlertUseCase },
  { provide: DiTokens.PluginUseCaseToken, useClass: PluginUseCase },
  { provide: DiTokens.DashboardUseCaseToken, useClass: DashboardUseCase },
  { provide: DiTokens.CredentialUseCaseToken, useClass: CredentialUseCase },
  { provide: DiTokens.WidgetUseCaseToken, useClass: WidgetUsecase }
];

@Module({
  imports: [InfrastructureModule],
  providers: [...useCaseProviders],
  exports: [...useCaseProviders]
})
export class UseCaseModule {}
