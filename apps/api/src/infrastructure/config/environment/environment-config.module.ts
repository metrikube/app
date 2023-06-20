import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '../environment/environment-config.validation';
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
