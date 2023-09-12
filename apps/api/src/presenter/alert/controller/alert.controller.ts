import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseArrayPipe, ParseUUIDPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { Alert } from '../../../domain/models/alert.model';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../dtos/create-alert.dto';
import { UpdateAlertDto } from '../dtos/update-alert.dto';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(@Inject(DiTokens.AlertUseCaseToken) private readonly alertUseCase: AlertUseCaseInterface) {}

  @Get('/:widgetId')
  @HttpCode(HttpStatus.OK)
  async getAlerts(@Param('widgetId', new ParseUUIDPipe()) widgetId: string): Promise<Alert[]> {
    return this.alertUseCase.getwidgetAlerts(widgetId);
  }

  @Post('/:widgetId')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAlertRequestDto, isArray: true })
  async createAlert(
    @Param('widgetId', new ParseUUIDPipe()) widgetId: string,
    @Body(new ParseArrayPipe({ items: CreateAlertRequestDto })) body: CreateAlertRequestDto[]
  ): Promise<CreateAlertResponseDto> {
    return this.alertUseCase.createAlertOnActivePlugin(widgetId, body);
  }

  @Patch(':alertId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: UpdateAlertDto })
  async updateAlert(@Param('alertId') alertId: string, @Body(new ValidationPipe()) payload: UpdateAlertDto): Promise<void> {
    return this.alertUseCase.updateAlert(alertId, payload);
  }

  @Delete(':alertId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlert(@Param('alertId') alertId: string): Promise<void> {
    return this.alertUseCase.deleteAlert(alertId);
  }
}
