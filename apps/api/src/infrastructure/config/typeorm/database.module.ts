import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CredentialEntity } from '../../database/entities/credential.entity';
import { PluginEntity } from '../../database/entities/plugin.entity';

const entities = [PluginEntity, CredentialEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities,
      synchronize: true,
      autoLoadEntities: true
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
