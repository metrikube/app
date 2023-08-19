import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { MetricType, PluginResult } from '@metrikube/common';

import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { PluginResponseDto } from '../dtos/plugins.dto';
import { RegisterPluginRequestDto } from '../dtos/register-plugin.dto';

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
  listPlugins(): Promise<PluginResponseDto> {
    return this.pluginUseCase.listPlugins();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a new plugin configuration' })
  registerPlugin(@Body() body: RegisterPluginRequestDto): Promise<unknown> {
    return this.pluginUseCase.registerPlugin(body);
  }

  @Get('/:id/:metricType')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get plugin data' })
  async getPluginData(
    @Param('id') pluginId: string,
    @Param('metricType') metricType: string
  ): Promise<PluginResult<MetricType>> {
    return this.pluginUseCase.refreshPluginMetric(pluginId, metricType);
  }
}
