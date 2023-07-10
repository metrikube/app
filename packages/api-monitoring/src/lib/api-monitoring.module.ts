import axios from 'axios';

import { Module } from '@nestjs/common';

import { ApiMonitoringService } from './api-monitoring.service';

@Module({
  controllers: [],
  providers: [ApiMonitoringService],
  exports: [ApiMonitoringService]
})
export class ApiMonitoringModule {}
