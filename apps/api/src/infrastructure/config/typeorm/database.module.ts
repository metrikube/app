import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlertEntity } from '../../database/entities/alert.entity';
import { CredentialEntity } from '../../database/entities/credential.entity';
import { MetricEntity } from '../../database/entities/metric.entity';
import { PluginEntity } from '../../database/entities/plugin.entity';
import { PluginToMetricEntity } from '../../database/entities/plugin_to_metric.entity';
import { TypeOrmLogger } from './typeorm.logger';

const entities = [PluginEntity, CredentialEntity, MetricEntity, AlertEntity, PluginToMetricEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/db',
      entities,
      synchronize: true,
      autoLoadEntities: true
      // logger: new TypeOrmLogger()
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
