import { ApiProperty } from '@nestjs/swagger';

export class ValidateCredentialResponseDto {
  @ApiProperty({ type: String, name: 'pluginId', description: 'Plugin ID' })
  pluginId: string;

  @ApiProperty({ type: Object, name: 'dataSample', description: 'Data sample' })
  dataSample: any;

  constructor(pluginId: string, dataSample: any) {
    this.pluginId = pluginId;
    this.dataSample = dataSample;
  }
}

export class ApiKeyCredentialDTO {
  @ApiProperty({ name: 'apiKey', type: String, description: 'API Key', example: 'INSERT_API_KEY_HERE' })
  apiKey: string;
}

export class UserPasswordCredentialDTO {
  @ApiProperty({ name: 'username', type: String, description: 'Username', example: 'INSERT_USERNAME_HERE' })
  username: string;

  @ApiProperty({ name: 'password', type: String, description: 'Password', example: 'INSERT_PASSWORD_HERE' })
  password: string;
}

export class DbConnectionCredentialDTO {
  @ApiProperty({ name: 'dbName', type: String, description: 'Database Name', example: 'mydb' })
  dbName: string;

  @ApiProperty({ name: 'dbHost', type: String, description: 'Database Host', example: 'localhost' })
  dbHost: string;

  @ApiProperty({ name: 'dbPort', type: Number, description: 'Database Port', example: 5432 })
  dbPort: number;

  @ApiProperty({ name: 'dbUsername', type: String, description: 'Database Username', example: 'postgres' })
  dbUsername: string;

  @ApiProperty({ name: 'dbPassword', type: String, description: 'Database Password', example: 'postgres' })
  dbPassword: string;
}

export class ApiEndpointCredentialDTO {
  @ApiProperty({ name: 'apiEndpoint', type: String, description: 'API Endpoint', example: 'https://jsonplaceholder.typicode.com/users' })
  apiEndpoint: string;
}

export class GithubCredentialDTO {
  @ApiProperty({ name: 'accessToken', type: String, description: 'Access Token', example: 'github_pat_token' })
  accessToken: string;

  @ApiProperty({ name: 'owner', type: String, description: 'Owner', example: 'metrikube' })
  owner: string;

  @ApiProperty({ name: 'repo', type: String, description: 'Repository', example: 'app' })
  repo: string;
}

export class AwsCredentialDTO {
  @ApiProperty({ name: 'accessKeyId', type: String, description: 'Access Key ID', example: 'aws_access_key_id' })
  accessKeyId: string;

  @ApiProperty({ name: 'secretAccessKey', type: String, description: 'Secret Access Key', example: 'aws_secret_access_key' })
  secretAccessKey: string;

  @ApiProperty({ name: 'region', type: String, description: 'Region', example: 'us-east-1' })
  region: string;

  @ApiProperty({ name: 'resourceId', type: String, required: false, description: 'Resource ID', example: 'i-1234567890abcdef0' })
  resourceId?: string;
}

export const credentialDtos = [ApiKeyCredentialDTO, UserPasswordCredentialDTO, DbConnectionCredentialDTO, ApiEndpointCredentialDTO, GithubCredentialDTO, AwsCredentialDTO];

export type CredentialTypesDtos = ApiKeyCredentialDTO | UserPasswordCredentialDTO | DbConnectionCredentialDTO | ApiEndpointCredentialDTO | GithubCredentialDTO | AwsCredentialDTO;

export const credentialsDtosExamples = {
  apiEndpoint: {
    value: {
      apiEndpoint: 'https://jsonplaceholder.typicode.com/users'
    }
  },
  apiKey: {
    value: {
      apiKey: 'INSERT_API_KEY_HERE'
    }
  },
  github: {
    value: {
      accessToken: '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',
      repo: 'app',
      owner: 'metrikube'
    }
  },
  dbConnection: {
    value: {
      dbName: 'mydb',
      dbHost: 'localhost',
      dbPort: 5432,
      dbUsername: 'postgres',
      dbPassword: 'postgres'
    }
  },
  userPassword: {
    value: {
      username: 'INSERT_USERNAME_HERE',
      password: 'INSERT_PASSWORD_HERE'
    }
  },
  aws: {
    value: {
      accessKeyId: 'aws_access_key_id',
      secretAccessKey: 'aws_secret_access_key',
      region: 'us-east-1',
      resourceId: 'i-1234567890abcdef0'
    }
  }
};
