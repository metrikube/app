import { CredentialType, GenericCredentialType, Metric, MetricType, Plugin } from '@metrikube/common';

import { ApiProperty } from '@nestjs/swagger';

import { Credential } from '../../domain/models/credential.model';
import { CredentialEntity } from '../../infrastructure/database/entities/credential.entity';
import { MetricEntity } from '../../infrastructure/database/entities/metric.entity';
import { PluginEntity } from '../../infrastructure/database/entities/plugin.entity';
import { PluginToMetricEntity } from '../../infrastructure/database/entities/plugin_to_metric.entity';

export class PluginRequestDto {}

export class PluginResponseDto {
  @ApiProperty({ name: 'plugins', type: [Plugin], description: 'The list of plugins', example: [] })
  plugins: Plugin[];

  constructor(plugins: PluginEntity[], metrics: MetricEntity[], credentials: CredentialEntity[]) {
    this.plugins = plugins.map((plugin) => ({
      id: plugin.id,
      type: plugin.type,
      instruction: plugin.instruction,
      description: plugin.description,
      createdAt: plugin.createdAt,
      name: plugin.name,
      category: plugin.category,
      credential: this.mapToPluginCredential(
        plugin,
        credentials.find((credential) => credential.pluginId === plugin.id)
      ),
      metrics: metrics
        .filter((metric) => metric.pluginId === plugin.id)
        .map((metric) => ({
          id: metric.id,
          type: metric.type,
          name: metric.name,
          isNotifiable: metric.isNotifiable
        })) as Metric[]
    }));
  }

  private mapToPluginCredential(plugin: PluginEntity, credentialEntity: CredentialEntity): Credential {
    return {
      type: plugin.credentialType as CredentialType,
      value: credentialEntity?.value ? (JSON.parse(Buffer.from(credentialEntity.value, 'base64').toString('utf-8')) as GenericCredentialType) : null
    };
  }
}

export class RegisterPluginRequestDto {
  @ApiProperty({
    type: Object,
    name: 'credential',
    description: 'The credential to use to connect to the plugin',
    example: {
      apiEndpoint: 'https://jsonplaceholder.typicode.com/users'
    }
  })
  credential: GenericCredentialType;

  @ApiProperty({ type: String, name: 'pluginId', description: 'The id of the plugin to register', example: 'da3439fd-f637-409c-8267-655a03a2e915' })
  pluginId: string;

  @ApiProperty({ type: String, name: 'metricType', description: 'The type of the metric to register', example: 'api-endpoint-health-check' })
  metricType: MetricType;

  @ApiProperty({ type: String, name: 'ressourceId', description: 'The id of the ressource to register if we need to connect to a specific ressource', example: 'i-0f4c2b6b2b2a1c2d3' })
  ressourceId?: string;
}

export class RegisterPluginResponseDto {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'The id of the created plugin_to_metric entity, it represents the connected metric in the dashboard',
    example: '1fe68a45-b3a1-44a5-bf87-7393cfa4017a'
  })
  public id: string;

  constructor(pluginToMetric: PluginToMetricEntity) {
    this.id = pluginToMetric.id;
  }
}
