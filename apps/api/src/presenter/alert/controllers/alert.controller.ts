import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, ParseArrayPipe, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../dtos/create-alert.dto';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(@Inject(DiTokens.AlertUseCaseToken) private readonly alertUseCase: AlertUseCaseInterface) {}

  @Post('/:pluginToMetricId')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAlertRequestDto, isArray: true })
  async createAlert(
    @Param('pluginToMetricId', new ParseUUIDPipe()) pluginToMetricId: string,
    @Body(new ParseArrayPipe({ items: CreateAlertRequestDto })) body: CreateAlertRequestDto[]
  ): Promise<CreateAlertResponseDto> {
    return this.alertUseCase.createAlertOnActivePlugin(pluginToMetricId, body);
  }

  @Delete('/:alertId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlert(@Param('alertId') alertId: string): Promise<void> {
    return this.alertUseCase.deleteAlert(alertId);
  }
}
