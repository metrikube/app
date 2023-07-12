import { Module } from '@nestjs/common';

import { DbAnalyticsPluginService } from './db-analytics-plugin.service';

@Module({
  controllers: [],
  providers: [DbAnalyticsPluginService],
  exports: [DbAnalyticsPluginService]
})
export class DbAnalyticsPluginModule {}
