import { Plugin } from './plugin.model';
import { CredentialType, GenericCredentialType } from '@metrikube/common';

export type CredentialType = {
  readonly apiKey: { apiKey: string };
  readonly userPassword: { username: string; password: string };
  readonly dbConnection: { dbName: string; dbUser: string; dbPassword: string; dbHost: string; dbPort: number };
  readonly apiEndpoint: { apiEndpoint: string };
  readonly passport: { passportConfig: unknown; strategyName: string };
  readonly plugin: Plugin;

};

export type Credential = {
  readonly type: CredentialType;
  readonly value: GenericCredentialType | string;
  readonly plugin: string;
};
