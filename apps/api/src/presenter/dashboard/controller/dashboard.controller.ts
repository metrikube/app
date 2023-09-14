import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DashboardUseCaseInterface } from '../../../domain/interfaces/use-cases/dashboard.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { DashboardNotificationDto } from '../dtos/dashboard-notification.dto';
import { RefreshDashboardResponseDto } from '../dtos/refresh-dashboard-response.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(@Inject(DiTokens.DashboardUseCaseToken) private readonly dashboardUseCase: DashboardUseCaseInterface) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh dashbaord dat' })
  fetchDashboardMetricData(): Promise<RefreshDashboardResponseDto[]> {
    return this.dashboardUseCase.refreshDashboard();
  }

  @Get('/notifications')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get dashboard notifications' })
  getDashboardNotification(): Promise<DashboardNotificationDto[]> {
    return this.dashboardUseCase.getDashboardNotification();
  }

  @Delete('disable/:widgetId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Disable dashbaord widget' })
  disableDashboard(@Param('widgetId', new ParseUUIDPipe()) widgetId: string): Promise<void> {
    return this.dashboardUseCase.disableDashboardMetric(widgetId);
  }
}
