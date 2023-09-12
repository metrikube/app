import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseArrayPipe, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlertUseCaseInterface } from '../../../domain/interfaces/use-cases/alert.use-case.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { WidgetUsecaseInterface } from '../../../domain/interfaces/use-cases/widget.usecase.interface';
import { Alert } from '../../../domain/models/alert.model';
import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { CreateAlertRequestDto, CreateAlertResponseDto } from '../../alert/dtos/create-alert.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../plugin/dtos/register-plugin.dto';

@ApiTags('widgets')
@Controller('widgets')
export class WidgetController {
  constructor(
    @Inject(DiTokens.AlertUseCaseToken) private readonly alertUsecase: AlertUseCaseInterface,
    @Inject(DiTokens.PluginUseCaseToken) private readonly pluginUsecase: PluginUseCaseInterface,
    @Inject(DiTokens.WidgetUseCaseToken) private readonly widgetUsecase: WidgetUsecaseInterface
  ) {}

  @Get(':widgetId/alerts')
  @ApiResponse({ type: AlertEntity, isArray: true, status: HttpStatus.OK, description: 'Get alerts for widget' })
  @ApiParam({ name: 'widgetId', type: String })
  getWidgetAlerts(@Param('widgetId', new ParseUUIDPipe()) widgetId: string): Promise<Alert[]> {
    return this.alertUsecase.getwidgetAlerts(widgetId);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'RegisterPluginResponseDto', type: RegisterPluginResponseDto })
  @ApiOperation({ summary: 'Add a new widget configuration' })
  registerPlugin(@Body() body: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto> {
    return this.pluginUsecase.registerPlugin(body);
  }

  @Post(':widgetId/alerts')
  @ApiBody({ type: CreateAlertRequestDto, isArray: true })
  async createAlert(
    @Param('widgetId', new ParseUUIDPipe()) widgetId: string,
    @Body(new ParseArrayPipe({ items: CreateAlertRequestDto })) body: CreateAlertRequestDto[]
  ): Promise<CreateAlertResponseDto> {
    return this.alertUsecase.createAlertOnActivePlugin(widgetId, body);
  }

  @Delete(':widgetId')
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Delete widget' })
  @ApiParam({ name: 'widgetId', type: String })
  deleteWidget(@Param('widgetId') widgetId: string): Promise<void> {
    return this.widgetUsecase.deleteWidget(widgetId);
  }
}
