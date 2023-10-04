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
  constructor(@Inject(DiTokens.DashboardUseCaseToken) private readonly dashboardUseCase: DashboardUseCaseInterface) {}

  @Sse('/')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'text/event-stream')
  @ApiOperation({ summary: 'Synchronize dashboard data using Serve Sent Events' })
  subscribeToDashboardMetricData(): Observable<{ data: string }> {
    return interval(5000).pipe(
      switchMap(() => this.dashboardUseCase.refreshDashboard()),
      map((data) => ({ data: JSON.stringify(data) }))
    );
  }

  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh dashbaord data' })
  fetchDashboardMetricData(): Promise<RefreshDashboardResponseDto[]> {
    return this.dashboardUseCase.refreshDashboard();
  }

  @Sse('/notifications')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get dashboard notifications' })
  subscribeToDashboardNotification(): Observable<{ data: string }> {
    return interval(5000).pipe(
      switchMap(() => this.dashboardUseCase.getDashboardNotification()),
      map((data) => ({ data: JSON.stringify(data) }))
    );
  }

  @Get('/notifications/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Subscribe to dashboard notifications' })
  refreshDashboardNotification(): Promise<DashboardNotificationDto[]> {
    return this.dashboardUseCase.getDashboardNotification();
  }

  @Delete('disable/:widgetId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Disable dashbaord widget' })
  disableDashboard(@Param('widgetId', new ParseUUIDPipe()) widgetId: string): Promise<void> {
    return this.dashboardUseCase.disableDashboardMetric(widgetId);
  }
}
