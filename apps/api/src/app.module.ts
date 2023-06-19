import { Module } from '@nestjs/common';

import { UseCaseModule } from './application/use-case.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ControllersModule } from './presenter/controllers.module';

@Module({
  imports: [ControllersModule, InfrastructureModule, UseCaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
