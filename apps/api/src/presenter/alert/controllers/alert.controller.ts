import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../dtos/create-alert.dto';

// prettier-ignore
@ApiTags('alerts')
@Controller('alerts')
export class AlertController {

  constructor(
    @Inject('ALERT_USE_CASE') private readonly alertUseCase: AlertUseCaseInterface
  ) {
  }

  @Post('/:pluginToMetricId')
  @HttpCode(HttpStatus.CREATED)
  async createAlert(
    @Param('pluginToMetricId') pluginToMetricId: string,
    @Body() body: CreateAlertRequestDto
  ): Promise<CreateAlertResponseDto> {
    return this.alertUseCase.createAlert(pluginToMetricId, body);
  }

  @Delete('/:alertId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlert(
    @Param('alertId') alertId: string
  ): Promise<void> {
    return this.alertUseCase.deleteAlert(alertId);
  }
}
