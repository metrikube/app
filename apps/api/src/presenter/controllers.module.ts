import { Module } from '@nestjs/common';

import { UseCaseModule } from '../application/use-case.module';
import { AlertController } from './alert/controller/alert.controller';
import { CredentialController } from './credential/controller/credential.controller';
import { DashboardController } from './dashboard/controller/dashboard.controller';
import { MetricController } from './metric/controller/metric.controller';
import { PluginController } from './plugin/controller/plugin.controller';
import { WidgetController } from './widgets/controllers/widget.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [AlertController, CredentialController, DashboardController, MetricController, PluginController, WidgetController],
  providers: []
})
export class ControllersModule {}
