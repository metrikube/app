import { Module } from '@nestjs/common';

import { EnvironmentConfigService } from './environment-config.service';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    //   isGlobal: true,
    //   validate,
    // }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService]
})
export class EnvironmentConfigModule {}
