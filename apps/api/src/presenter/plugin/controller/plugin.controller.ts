import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { MetricType, MetricTypeEnum, PluginResult } from '@metrikube/common';

import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { PluginResponseDto } from '../dtos/plugins.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../dtos/register-plugin.dto';

// prettier-ignore
@ApiTags('plugins')
@Controller('plugins')
export class PluginController {
  constructor(
    @Inject(DiTokens.ApiMonitoringToken) private readonly apiMonitoring: ApiMonitoringService,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUseCase: PluginUseCaseInterface
  ) {
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all plugins with available metrics' })
  @ApiResponse({ status: HttpStatus.OK, type: PluginResponseDto, description: 'List all plugins with available metrics' })
  listPlugins(): Promise<PluginResponseDto> {
    return this.pluginUseCase.listPlugins();
  }

  @Get('/:id/:widgetId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get plugin data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get plugin data' })
  @ApiParam({ name: 'id', type: String, description: 'Plugin id' })
  @ApiParam({ name: 'widgetId', description: 'widget id' })
  async getPluginData(
    @Param('id') pluginId: string,
    @Param('widgetId') widgetId: string
  ): Promise<PluginResult<MetricType>> {
    return this.pluginUseCase.refreshPluginMetric(pluginId, widgetId);
  }
}
