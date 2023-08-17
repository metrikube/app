import { readFileSync } from 'fs';
import { join } from 'path';
import { DataSource } from 'typeorm';

import { Logger, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap, RequestMethod } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { InjectDataSource } from '@nestjs/typeorm';

import { UseCaseModule } from './application/use-case.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { HttpLoggerMiddleware } from './infrastructure/middlewares/http-logger.middleware';
import { ControllersModule } from './presenter/controllers.module';

@Module({
  imports: [
    ControllersModule,
    InfrastructureModule,
    UseCaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'app/web')
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  async onApplicationBootstrap(): Promise<void> {
    //   await this.connection.dropDatabase();
    //   Logger.verbose('💾 Drop Database...', AppModule.name);
    //   await this.connection.synchronize();
    //   Logger.verbose('💾 Create Database...', AppModule.name);
    //
    //   Logger.verbose('💾 Seeding Database...', AppModule.name);
    //   const file = readFileSync(join(__dirname, '..', '../../data/seed.sql'), 'utf8');
    //   const [queries] = file.split(';');
    //   for (const query of queries) {
    //     try {
    //       const parsedQuery = query.replaceAll('\n', ' ').replaceAll('\t', ' ').replaceAll('\r', ' ').trim();
    //       await this.connection.query(parsedQuery);
    //     } catch (err) {
    //       console.log('err : ', query, err.message);
    //       Logger.error('💾 Seeding DB FAILED', AppModule.name);
    //     }
    //   }
    // }
  }
}
