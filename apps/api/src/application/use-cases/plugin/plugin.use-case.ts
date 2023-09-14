import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { EncryptionServiceInterface } from '../../../domain/interfaces/common/encryption-service.interface';
import { PluginResolverInterface } from '../../../domain/interfaces/common/plugin-resolver.interface';
import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { CredentialRepository } from '../../../domain/interfaces/repository/credential.repository';
import { MetricRepository } from '../../../domain/interfaces/repository/metric.repository';
import { PluginRepository } from '../../../domain/interfaces/repository/plugin.repository';
import { WidgetRepository } from '../../../domain/interfaces/repository/widget.repository';
import { SchedulerInterface } from '../../../domain/interfaces/scheduler/scheduler.interface';
import { PluginUseCaseInterface } from '../../../domain/interfaces/use-cases/plugin.use-case.interface';
import { Credential } from '../../../domain/models/credential.model';
import { Metric } from '../../../domain/models/metric.model';
import { Plugin } from '../../../domain/models/plugin.model';
import { PluginEntity } from '../../../infrastructure/database/entities/plugin.entity';
import { WidgetEntity } from '../../../infrastructure/database/entities/widget.entity';
import { DiTokens } from '../../../infrastructure/di/tokens';
import { PluginResponseDto } from '../../../presenter/plugin/dtos/plugins.dto';
import { RegisterPluginRequestDto, RegisterPluginResponseDto } from '../../../presenter/plugin/dtos/register-plugin.dto';

// prettier-ignore
@Injectable()
export class PluginUseCase implements PluginUseCaseInterface {

  constructor(
    @Inject(DiTokens.AlertRepositoryToken) private readonly alertRepository: AlertRepository,
    @Inject(DiTokens.CredentialRepositoryToken) private readonly credentialRepository: CredentialRepository,
    @Inject(DiTokens.MetricRepositoryToken) private readonly metricRepository: MetricRepository,
    @Inject(DiTokens.PluginRepositoryToken) private readonly pluginRepository: PluginRepository,
    @Inject(DiTokens.PluginResolver) private readonly pluginResolver: PluginResolverInterface,
    @Inject(DiTokens.Scheduler) private readonly scheduler: SchedulerInterface,
    @Inject(DiTokens.WidgetRepositoryToken) private readonly widgetRepository: WidgetRepository,
    @Inject(DiTokens.EncryptionService) private readonly encryptionService: EncryptionServiceInterface
  ) {
  }

  async listPlugins(): Promise<PluginResponseDto> {
    const [plugins, metrics, credentials]: [Plugin[], Metric[], Credential[]] = await Promise.all([
      this.pluginRepository.getPlugins(),
      this.metricRepository.getMetrics(),
      this.credentialRepository.getCredentials()
    ]);

    // const mappedPlugins = plugins.map((plugin) => ({}));

    return new PluginResponseDto(plugins, metrics, credentials);
  }

  async registerPlugin({ pluginId, metricType, credential, resourceId, name }: RegisterPluginRequestDto): Promise<RegisterPluginResponseDto> {
    const [plugin, metric] = await Promise.all([
      this.pluginRepository.findOneById(pluginId),
      this.metricRepository.findMetricByType(pluginId, metricType)
    ]);
    if (!plugin || !metric) throw new BadRequestException("Plugin or metric not found");

    await this.pluginResolver.testPluginConnection(plugin, credential);

    const pluginCredential = await this.credentialRepository.createCredential({
      type: plugin.credentialType,
      value: this.encryptionService.encryptJson(credential),
      pluginId
    });

    const widget = await this.widgetRepository.createwidget({
      pluginId,
      name,
      credentialId: pluginCredential.id,
      metricId: metric.id,
      resourceId,
      isActive: true
    });

    const pluginDataSample = await this.refreshPluginMetric(pluginId, widget.id);

    return new RegisterPluginResponseDto(widget, pluginDataSample);
  }

  async getPluginTrackableFieldsByMetricId(metricId: string): Promise<string[]> {
    const metric = await this.metricRepository.findById(metricId);
    if (!metric) throw new NotFoundException("Metric not found");

    return this.pluginResolver.describeMetricTrackableFields(metric?.plugin.type, metric.type);
  }

  /**
   * TODO : sécurisé si jamais l'utlisateurs supprime un plugin et envoi un pluginId qui n'a pas de metricType associé
   * @param pluginId
   * @param widgetId
   */
  async refreshPluginMetric(pluginId: PluginEntity["id"], widgetId: WidgetEntity["id"]): Promise<PluginResult<MetricType>> {
    const widget = await this.widgetRepository.findwidgetById(widgetId);
    const credential = await this.credentialRepository.findCredentialByIdAndPluginId(widget.credentialId, pluginId);
    if (!credential) throw new BadRequestException("No credentials found for this plugin");
    const metricType = widget.metric.type as MetricType;

    const parsedCredential = this.encryptionService.decryptJson<GenericCredentialType>(credential.value);
    return this.pluginResolver.queryPluginDataByMetricType(metricType, parsedCredential);
  }

  getPluginCredentials(pluginId: string): Promise<Credential> {
    return this.credentialRepository.findCrendentialByPluginId(pluginId);
  }

  async create(plugin: Plugin): Promise<Plugin> {
    return this.pluginRepository.createPlugin(plugin);
  }
}
