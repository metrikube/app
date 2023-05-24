import { Module } from '@nestjs/common';
import { AwsPluginService } from './aws-plugin.service';

@Module({
  controllers: [],
  providers: [AwsPluginService],
  exports: [AwsPluginService],
})
export class AwsPluginModule {}
