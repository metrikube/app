import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSServiceType, GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../domain/models/credential.model';
import { PluginResponseDto, RegisterPluginRequestDto } from '../dto/plugins.dto';

// prettier-ignore
@ApiTags('plugins')
@Controller('plugins')
export class PluginsController {
  constructor(@Inject('API_MONITORING') private readonly apiMonitoring: ApiMonitoringService, @Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface) {}

  @Get('/')
  @ApiOperation({ summary: 'List all plugins with available metrics' })
  listPlugins(): Promise<PluginResponseDto> {
    return this.pluginUseCase.listPlugins();
  }

  @Post('/')
  @ApiOperation({ summary: 'Add a new plugin configuration' })
  registerPlugin(@Body() body: RegisterPluginRequestDto): Promise<unknown> {
    return this.pluginUseCase.registerPlugin(body);
  }

  @Get('/:id/:metricType')
  @ApiOperation({ summary: 'Get plugin data' })
  async getPluginData(@Param('id') pluginId: string, @Param('metricType') metricType: string): Promise<PluginResult<MetricType>> {
    return this.pluginUseCase.refreshPluginMetric(pluginId, metricType);
  }

  @Get('/aws')
  getAWS(@Query('region') region: string, @Query('services') services: AWSServiceType[]): any {
    return this.pluginUseCase.getAWSPlugin().getServicesInformations(services, region);
  }
}
