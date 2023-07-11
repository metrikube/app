import { CredentialType, GenericCredentialType } from '@metrikube/common';

import { Plugin } from './plugin.model';

export type Credential = {
  readonly type: CredentialType;
  readonly value: GenericCredentialType | string;
  readonly pluginId?: Plugin['id'];
};
