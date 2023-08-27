import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseArrayPipe, ParseUUIDPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../dtos/create-alert.dto';
import { UpdateAlertDto } from '../dtos/update-alert.dto';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(@Inject(DiTokens.AlertUseCaseToken) private readonly alertUseCase: AlertUseCaseInterface) {}

  @Get('/:pluginToMetricId')
  @HttpCode(HttpStatus.OK)
  async getAlerts(@Param('pluginToMetricId', new ParseUUIDPipe()) pluginToMetricId: string): Promise<AlertEntity[]> {
    return this.alertUseCase.getPluginToMetricAlerts(pluginToMetricId);
  }

  @Post('/:pluginToMetricId')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAlertRequestDto, isArray: true })
  async createAlert(
    @Param('pluginToMetricId', new ParseUUIDPipe()) pluginToMetricId: string,
    @Body(new ParseArrayPipe({ items: CreateAlertRequestDto })) body: CreateAlertRequestDto[]
  ): Promise<CreateAlertResponseDto> {
    return this.alertUseCase.createAlertOnActivePlugin(pluginToMetricId, body);
  }

  @Patch(':alertId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateAlert(@Param('alertId') alertId: string, @Body(new ValidationPipe()) payload: UpdateAlertDto): Promise<void> {
    return this.alertUseCase.updateAlert(alertId, payload);
  }
}
