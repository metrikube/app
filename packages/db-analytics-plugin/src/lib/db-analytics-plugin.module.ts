import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CredentialEntity } from '../../../../apps/api/src/infrastructure/database/entities/credential.entity';
import { DbAnalyticsPluginService } from './db-analytics-plugin.service';

@Module({
  controllers: [],
  providers: [DbAnalyticsPluginService],
  exports: [DbAnalyticsPluginService]
})
export class DbAnalyticsPluginModule {}
