import { MetricType } from '@metrikube/common';
import { Credential } from '../../apps/api/src/domain/models/credential.model';

export type Plugin = {
  readonly id: string; // UUID
  readonly type: string; // PluginType  // aws | gcp | azure | ...
  readonly name: string;
  readonly description: string;
  readonly instruction: string;
  readonly category: string; // cloud | database | versioning
  readonly metrics?: Metric[];
  readonly createdAt: Date;
  readonly credential?: Credential;
};

export type Metric = {
  readonly id: string; // UUID
  readonly name: string;
  // readonly description: string;
  readonly isNotifiable: boolean;
  readonly refreshInterval: number; // in seconds
  readonly type: MetricType; // WidgetType
  readonly createdAt?: Date;
};
