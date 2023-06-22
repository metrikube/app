import { AWSService, AwsPluginModule } from '@metrikube/aws-plugin';

import { Module } from '@nestjs/common';

import { PluginRepositoryImpl } from '../infrastructure/database/repositories/plugin.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, AwsPluginModule],
  providers: [
    {
      provide: 'PLUGIN_REPOSITORY',
      useClass: PluginRepositoryImpl,
    },
    {
      provide: 'AWS_PLUGIN',
      useClass: AWSService,
    },
  ],
  exports: [],
})
export class UseCaseModule {}
