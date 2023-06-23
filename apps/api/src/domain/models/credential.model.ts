import { CredentialType, GenericCredentialType } from '@metrikube/common';

export type Credential = {
  readonly type: CredentialType;
  readonly value: GenericCredentialType | string;
};
