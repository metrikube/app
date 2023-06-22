import { AwsPluginModule, CostExplorerService, EC2Service } from '@metrikube/aws-plugin';

import { Module } from '@nestjs/common';

import { CredentialRepositoryImpl } from '../infrastructure/database/repositories/credential.repository';
import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, AwsPluginModule],
  providers: [
    {
      provide: 'PLUGIN_REPOSITORY',
      useClass: PluginRepositoryImpl
    },
    {
      provide: 'CREDENTIAL_REPOSITORY',
      useClass: CredentialRepositoryImpl
    },
    {
      provide: 'COST_EXPLORER_SERVICE',
      useClass: CostExplorerService
    },
    {
      provide: 'EC2_SERVICE',
      useClass: EC2Service
    }
  ],
  exports: []
})
export class UseCaseModule {}
