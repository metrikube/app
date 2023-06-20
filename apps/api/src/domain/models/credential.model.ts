export type CredentialType = {
  readonly apiKey: { apiKey: string };
  readonly userPassword: { username: string; password: string };
  readonly passport: { passportConfig: unknown; strategyName: string };
};

export type Credential = {
  readonly type: keyof CredentialType;
  readonly value: CredentialType[keyof CredentialType];
};
