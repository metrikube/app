import { Module } from '@nestjs/common'

import { AWSService } from '../services/aws.service'

@Module({
  controllers: [],
  providers: [AWSService],
  exports: [AWSService]
})
export class AwsPluginModule {}
