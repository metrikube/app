import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AlertEntity } from '../../database/entities/alert.entity'
import { CredentialEntity } from '../../database/entities/credential.entity'
import { MetricEntity } from '../../database/entities/metric.entity'
import { PluginEntity } from '../../database/entities/plugin.entity'

const entities = [PluginEntity, CredentialEntity, MetricEntity, AlertEntity]

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/db',
      entities,
      synchronize: true,
      autoLoadEntities: true
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
