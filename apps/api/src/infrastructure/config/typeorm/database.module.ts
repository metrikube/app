import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlertEntity } from '../../database/entities/alert.entity';
import { CredentialEntity } from '../../database/entities/credential.entity';
import { PluginEntity } from '../../database/entities/plugin.entity';
import { WidgetEntity } from '../../database/entities/widget.entity';

const entities = [PluginEntity, CredentialEntity, WidgetEntity, AlertEntity];

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
