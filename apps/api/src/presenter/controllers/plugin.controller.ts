import { ApiMonitoringService } from '@metrikube/api-monitoring'
import { MetricType, PluginResult } from '@metrikube/common'

import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface'

// prettier-ignore
@ApiTags('plugin')
@Controller('plugin')
export class PluginController {
  constructor(
    @Inject('API_MONITORING') private readonly apiMonitoring: ApiMonitoringService,
    @Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface
  ) {}

  @Get('/:id/:metricType')
  @ApiOperation({ summary: 'Get plugin data' })
  async getPluginData(
    @Param('id') pluginId: string,
    @Param('metricType') metricType: string
  ): Promise<PluginResult<MetricType>> {
    return this.pluginUseCase.refreshPluginMetric(pluginId, metricType);
  }
}
