export type ApiKeyCredentialType = { apiKey: string };
export type UserPasswordCredentialType = { username: string; password: string };
export type DbConnectionCredentialType = { dbName: string; dbHost: string; dbPort: number; dbUsername: string; dbPassword: string };
export type ApiEndpointCredentialType = { apiEndpoint: string };
export type GithubCredentialType = { accessToken: string; owner: string; repo: string };
export type AwsCredentialType = { accessKeyId: string; secretAccessKey: string; region: string; resourceId?: string };

// prettier-ignore
export type CredentialType =
  | 'apiKey'
  | 'userPassword'
  | 'dbConnection'
  | 'apiEndpoint'
  | 'github'
  | 'aws';

// prettier-ignore
export type GenericCredentialType =
  | ApiKeyCredentialType
  | UserPasswordCredentialType
  | DbConnectionCredentialType
  | ApiEndpointCredentialType
  | GithubCredentialType
  | AwsCredentialType;
