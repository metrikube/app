import { Controller, Get, HttpStatus, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';

@ApiTags('metrics')
@Controller('metrics')
export class MetricController {
  constructor(@Inject(DiTokens.PluginUseCaseToken) private readonly pluginUsecase: PluginUseCaseInterface) {}

  @Get(':metricId/describe')
  @ApiResponse({ type: String, isArray: true, status: HttpStatus.OK, description: 'Get plugin trackable fields' })
  @ApiParam({ name: 'metricId', type: String, example: '17cb98f1-0915-4b28-9c42-a65e7f711632' })
  describe(@Param('metricId', new ParseUUIDPipe()) metricId: string): Promise<string[]> {
    return this.pluginUsecase.getPluginTrackableFieldsByMetricId(metricId);
  }
}
