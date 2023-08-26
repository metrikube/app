import { GenericCredentialType } from '../credential';
import { MetricType } from '../metric';

type Timestamp = number;
// @ts-ignore
export type PluginResult<T extends MetricType> = ApiResult[T];

export type ApiResult = {
  'api-endpoint-health-check': ApiHealthCheckResult;
  'aws-bucket-single-instance': ApiAWSSingleResourceInstanceResult;
  'aws-bucket-multiple-instances': ApiAWSSingleResourceInstanceResult[];
  'aws-ec2-single-instance-usage': ApiAWSSingleResourceInstanceResult;
  'aws-ec2-multiple-instances-usage': ApiAWSSingleResourceInstanceResult[];
  'github-last-prs': ApiGithubPullRequestsOrIssues;
  'github-last-issues': ApiGithubPullRequestsOrIssues;
  'database-queries': ApiDatabaseLastAverageQueriesByHour[];
  'database-size': ApiDatabaseSize;
  'database-slow-queries': ApiDatabaseSlowQueries[];
};

export interface ApiDatabaseSlowQueries {
  query: string;
  executionTime: number;
  date: Timestamp;
}

export interface ApiDatabaseLastAverageQueriesByHour {
  numberOfQueries: number;
  query: string;
  date: Timestamp;
}

export interface ApiDatabaseSize {
  size: number;
  numberOfTables: number;
  numberOfTotalRows: number;
  databaseName: string;
}

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

export interface ApiGithubIssues {
  title: string;
  number: number;
  author: string;
  status: string;
  url: string;
}

export type ApiGithubPullRequestsOrIssues = ApiGithubIssues | ApiGithubError;

export interface ApiHealthCheckResult {
  status: number;
  value: number;
  unit: string;
  details: unknown;
}

export interface ApiGithubError {
  error: true;
  status: number;
  message: string | null;
}

export interface PluginConnectionInterface {
  testConnection(credential: GenericCredentialType): Promise<{ ok: boolean; message: string | null }>;
}
