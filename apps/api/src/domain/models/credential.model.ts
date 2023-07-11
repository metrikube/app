import { CredentialType, GenericCredentialType, Plugin } from '@metrikube/common';

export type Credential = {
  readonly type: CredentialType;
  readonly value: GenericCredentialType | string;
  readonly pluginId?: Plugin['id'];
};

