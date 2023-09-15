import { Observable, interval, map, switchMap } from 'rxjs';

import { Controller, Delete, Get, Header, HttpCode, HttpStatus, Inject, Param, ParseUUIDPipe, Sse } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DashboardUseCaseInterface } from '../../../domain/interfaces/use-cases/dashboard.use-case.interface';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { DashboardNotificationDto } from '../dtos/dashboard-notification.dto';
import { RefreshDashboardResponseDto } from '../dtos/refresh-dashboard-response.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(@Inject(DiTokens.DashboardUseCaseToken) private readonly dashboardUseCase: DashboardUseCaseInterface) { }

  @Sse('/')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'text/event-stream')
  @ApiOperation({ summary: 'Refresh dashbaord data' })
  fetchDashboardMetricData(): Observable<{ data: RefreshDashboardResponseDto[] }> {
    return interval(3000).pipe(
      switchMap((_) => this.dashboardUseCase.refreshDashboard()),
      map((data) => ({ data }))
    );
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
