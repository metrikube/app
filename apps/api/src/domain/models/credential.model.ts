import { CredentialType, GenericCredentialType, Plugin } from '@metrikube/common';

import { PluginEntity } from '../../infrastructure/database/entities/plugin.entity';

export type Credential = {
  readonly type: CredentialType;
  readonly value: GenericCredentialType | string;
  readonly pluginId?: Plugin['id'];
  readonly plugin?: Plugin | PluginEntity;
};
