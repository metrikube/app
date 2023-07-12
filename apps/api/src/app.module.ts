import { join } from 'path';

import { Logger, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  onApplicationBootstrap(): void {
    Logger.verbose('This will be invoked on application boostrap', AppModule.name);
    // Logger.verbose('💾 Run db migrations...', AppModule.name);
  }
}
