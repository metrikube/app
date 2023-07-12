import { Issues, PullRequests } from '@metrikube/common';
import { GenericCredentialType } from '../credential';
import { MetricType } from '../metric';

// @ts-ignore
export type PluginResult<T extends MetricType> = ApiResult[T];

export type ApiResult = {
  'api-endpoint-health-check': ApiHealthCheckResult;
  'aws-bucket-single-instance': ApiAWSSingleResourceInstanceResult;
  'aws-bucket-multiple-instances': ApiAWSSingleResourceInstanceResult[];
  'aws-ec2-single-instance-usage': ApiAWSSingleResourceInstanceResult;
  'aws-ec2-multiple-instances-usage': ApiAWSSingleResourceInstanceResult[];
  'github-last-prs': PullRequests | ApiGithubError;
  'github-last-issues': Issues | ApiGithubError;
  'database-queries': unknown;
  'database-size': unknown;
  'database-slow-queries': unknown;
};

export interface ApiAWSSingleResourceInstanceResult {
  id: string;
  name: string;
  status: boolean;
  cost: number | string;
  region?: string;
  currency?: string;
}

export interface ApiAWSCostExplorerResult {
  service: string;
  cost: number | string;
  currency: string;
}

export interface ApiHealthCheckResult {
  status: number;
  value: number;
  unit: string;
  details: unknown;
}

export interface ApiGithubError {
  status: number;
  message: string | null;
}

export interface PluginConnectionInterface {
  testConnection(credential: GenericCredentialType): Promise<{ ok: boolean; message: string | null }>;
}
