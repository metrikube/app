import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UseCaseModule } from './application/use-case.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ControllersModule } from './presenter/controllers.module';


@Module({
  imports: [
    ControllersModule,
    InfrastructureModule,
    UseCaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'app/web'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
