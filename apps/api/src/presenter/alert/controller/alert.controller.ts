import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, Patch, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { UpdateAlertDto } from '../dtos/update-alert.dto';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(@Inject(DiTokens.AlertUseCaseToken) private readonly alertUseCase: AlertUseCaseInterface) {}

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
