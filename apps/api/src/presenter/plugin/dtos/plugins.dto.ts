import { ApiProperty } from '@nestjs/swagger';

import { CredentialType, GenericCredentialType, MetricType } from '@metrikube/common';

import { Credential } from '../../../domain/models/credential.model';
import { Metric } from '../../../domain/models/metric.model';
import { Plugin } from '../../../domain/models/plugin.model';

export class PluginRequestDto {}

export class PluginResponseDto {
  @ApiProperty({ name: 'plugins', type: [Plugin], description: 'The list of plugins', example: [] })
  plugins: {
    id: Plugin['id'];
    type: Plugin['type'];
    instruction: Plugin['instruction'];
    description: Plugin['description'];
    name: Plugin['name'];
    category: Plugin['category'];
    credential: {
      type: CredentialType;
      value: GenericCredentialType;
    };
    metrics: {
      id: Metric['id'];
      type: MetricType;
      name: Metric['name'];
      isNotifiable: Metric['isNotifiable'];
    }[];
  }[];

  constructor(plugins: Plugin[], metrics: Metric[], credentials: Credential[]) {
    this.plugins = plugins.map((plugin) => ({
      id: plugin.id,
      type: plugin.type,
      instruction: plugin.instruction,
      description: plugin.description,
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
        }))
    }));
  }

  private mapToPluginCredential(
    plugin: Plugin,
    credentialEntity: Credential
  ): {
    type: CredentialType;
    value: GenericCredentialType;
  } {
    return {
      type: plugin.credentialType as CredentialType,
      value: credentialEntity?.value ? (JSON.parse(Buffer.from(credentialEntity.value, 'base64').toString('utf-8')) as GenericCredentialType) : null
    };
  }
}
