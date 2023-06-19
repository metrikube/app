import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      // entities: [Plugin],
      entities: [__dirname + '/../../database/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
