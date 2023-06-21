import { Module } from '@nestjs/common';

import { AwsClientService } from '../services/aws-client.service';
import { CostExplorerService } from '../services/cost-explorer.service';

@Module({
  controllers: [],
  providers: [AwsClientService, CostExplorerService],
  exports: [AwsClientService, CostExplorerService],
})
export class AwsPluginModule {}
