export type ApiKeyCredentialType = { apiKey: string };
export type UserPasswordCredentialType = { username: string; password: string };
export type DbConnectionCredentialType = { dbName: string; dbHost: string; dbPort: number; dbUsername: string; dbPassword: string };
export type ApiEndpointCredentialType = { apiEndpoint: string };

export type CredentialType = 'apiKey' | 'userPassword' | 'dbConnection' | 'apiEndpoint';

export type GenericCredentialType = ApiKeyCredentialType | UserPasswordCredentialType | DbConnectionCredentialType | ApiEndpointCredentialType;
