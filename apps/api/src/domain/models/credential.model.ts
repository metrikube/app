import { Plugin } from './plugin.model';

export type CredentialType = {
  readonly apiKey: { apiKey: string };
  readonly userPassword: { username: string; password: string };
  readonly dbConnection: { dbName: string; dbUser: string; dbPassword: string; dbHost: string; dbPort: number };
  readonly apiEndpoint: { apiEndpoint: string };
  readonly passport: { passportConfig: unknown; strategyName: string };
  readonly plugin: Plugin;

};

export type Credential = {
  readonly type: keyof CredentialType;
  readonly value: CredentialType[keyof CredentialType];
  readonly plugin: string;

};