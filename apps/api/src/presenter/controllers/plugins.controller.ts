import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSServiceType, AwsCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PluginUseCaseInterface } from '../../domain/interfaces/use-cases/plugin.use-case.interface';
import { PluginResponseDto, RegisterPluginRequestDto } from '../dto/plugins.dto';

// prettier-ignore
@ApiTags('plugins')
@Controller('plugins')
export class PluginsController {
  constructor(@Inject('API_MONITORING') private readonly apiMonitoring: ApiMonitoringService, @Inject('PLUGIN_USE_CASE') private readonly pluginUseCase: PluginUseCaseInterface) {}

  @Get('/')
  @ApiOperation({ summary: 'List all plugins with available metrics' })
  listPlugins(): Promise<PluginResponseDto> {
    return this.pluginUseCase.listPlugins();
  }

  @Post('/')
  @ApiOperation({ summary: 'Add a new plugin configuration' })
  registerPlugin(@Body() body: RegisterPluginRequestDto): Promise<unknown> {
    return this.pluginUseCase.registerPlugin(body);
  }

  @Get('/:id/:metricType')
  @ApiOperation({ summary: 'Get plugin data' })
  async getPluginData(@Param('id') pluginId: string, @Param('metricType') metricType: string): Promise<PluginResult<MetricType>> {
    return this.pluginUseCase.refreshPluginMetric(pluginId, metricType);
  }

  @Post('/aws')
  @ApiOperation({ summary: 'Get AWS informations' })
  async getAWS(@Body() body: { services: AWSServiceType[], credentials: AwsCredentialType }) {
    const { services, credentials } = body;
    return this.pluginUseCase.getAWSPlugin().getServicesInformations(credentials, services);
  }

  @Post('/aws/ec2')
  @ApiOperation({ summary: 'Get an ec2 instance based on its id' })
  async getAWSEc2Instance(@Body() body: { id: string, credentials: AwsCredentialType }) {
    const { id, credentials } = body;
    return this.pluginUseCase.getAWSPlugin().getEc2Service(credentials).getInstanceInformation(id);
  }
}
