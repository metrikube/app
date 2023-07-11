import { CredentialType, GenericCredentialType } from '@metrikube/common';

import { Credential } from '../../domain/models/credential.model';
import { Metric } from '../../domain/models/metric.model';
import { Plugin } from '../../domain/models/plugin.model';
import { CredentialEntity } from '../../infrastructure/database/entities/credential.entity';
import { MetricEntity } from '../../infrastructure/database/entities/metric.entity';
import { PluginEntity } from '../../infrastructure/database/entities/plugin.entity';

export class PluginRequestDto {}

export class PluginResponseDto {
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
