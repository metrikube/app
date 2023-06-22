import { CostExplorerService } from '@metrikube/aws-plugin';
import { EC2Service } from '@metrikube/aws-plugin';

import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { PluginUseCase } from '../application/use-cases/plugin/plugin.use-case';
import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AppController],
  providers: [
    { provide: 'PLUGIN_USE_CASE', useClass: PluginUseCase },
    { provide: 'PLUGIN_REPOSITORY', useClass: PluginRepositoryImpl },
    { provide: 'CREDENTIAL_REPOSITORY', useClass: CredentialRepositoryImpl },
    { provide: 'COST_EXPLORER_SERVICE', useClass: CostExplorerService },
    { provide: 'EC2_SERVICE', useClass: EC2Service }
  ]
})
export class ControllersModule {}
