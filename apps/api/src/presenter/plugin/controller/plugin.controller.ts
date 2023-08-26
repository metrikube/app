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

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'RegisterPluginResponseDto', type: RegisterPluginResponseDto })
  @ApiOperation({ summary: 'Add a new plugin configuration' })
  registerPlugin(@Body() body: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto> {
    return this.pluginUseCase.registerPlugin(body);
  }

  @Get('/:id/:metricType')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get plugin data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get plugin data' })
  @ApiParam({ name: 'id', type: String, description: 'Plugin id' })
  @ApiParam({ name: 'metricType', enum: MetricTypeEnum, description: 'Metric type' })
  async getPluginData(
    @Param('id') pluginId: string,
    @Param('metricType') metricType: string
  ): Promise<PluginResult<MetricType>> {
    return this.pluginUseCase.refreshPluginMetric(pluginId, metricType);
  }
}