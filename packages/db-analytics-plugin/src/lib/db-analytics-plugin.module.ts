import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from '../../../../apps/api/src/infrastructure/database/entities/credential.entity';
import { DbAnalyticsPluginService } from './db-analytics-plugin.service';
import { CredentialRepositoryImpl } from '../../../../apps/api/src/infrastructure/database/repositories/credential.repository';
import { CredentialRepository } from '../../../../apps/api/src/domain/interfaces/repository/credential.repository';


@Module({
  controllers: [],
  providers: [DbAnalyticsPluginService, CredentialRepositoryImpl],
  exports: [DbAnalyticsPluginService, CredentialRepositoryImpl],
})
export class DbAnalyticsPluginModule {}
