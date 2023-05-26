import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { EnvironmentConfigModule } from '../environment/environment-config.module';
import { EnvironmentConfigService } from '../environment/environment-config.service';

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions =>
  ({
    type: 'mariadb',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    // entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    migrationsRun: true,
    migrations: [__dirname + '/../../**/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
