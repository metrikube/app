import { ApiMonitoringService } from '@metrikube/api-monitoring'
import { MetricType, PluginResult } from '@metrikube/common'

import { Controller, Get, Inject, Param } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('plugin')
@Controller('plugin')
export class PluginController {
  constructor(@Inject('API_MONITORING') private readonly apiMonitoring: ApiMonitoringService) {}

  @Get('/:id/:metric')
  @ApiOperation({ summary: 'Get plugin data' })
  getPluginData(@Param('id') pluginId: string, @Param('metric') metric: string): PluginResult<MetricType> {
    // Todo : get the data and credentials for this plugin from the database
    // Todo : call the plugin service to get the data
    // Todo : return the data
    return this.apiMonitoring.apiHealthCheck({
      apiEndpoint: 'https://jsonplaceholder.typicode.com/users'
    })
  }
}
