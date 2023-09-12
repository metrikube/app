import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlertEntity } from '../../database/entities/alert.entity';
import { CredentialEntity } from '../../database/entities/credential.entity';
import { MetricEntity } from '../../database/entities/metric.entity';
import { PluginEntity } from '../../database/entities/plugin.entity';
import { WidgetEntity } from '../../database/entities/widget.entity';

const entities = [PluginEntity, CredentialEntity, MetricEntity, AlertEntity, WidgetEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/db',
      entities,
      autoLoadEntities: true
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
