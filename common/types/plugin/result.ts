import { GenericCredentialType } from '../credential';
import { MetricType } from '../metric';

type Timestamp = string;
// @ts-ignore
export type PluginResult<T extends MetricType> = ApiResult[T];

export type ApiResult = {
  'api-endpoint-health-check': ApiHealthCheckResult;
  'aws-bucket-single-instance': ApiAWSSingleResourceInstanceResult;
  'aws-bucket-multiple-instances': ApiAWSSingleResourceInstanceResult[];
  'aws-ec2-single-instance-usage': ApiAWSSingleResourceInstanceResult;
  'aws-ec2-multiple-instances-usage': ApiAWSSingleResourceInstanceResult[];
  'github-last-prs': ApiGithubIssues[] | ApiGithubError;
  'github-last-issues': ApiGithubIssues[] | ApiGithubError;
  'database-queries': ApiDatabaseLastAverageQueriesByHour | DatabaseError;
  'database-size': ApiDatabaseSize;
  'database-slow-queries': ApiDatabaseSlowQueries[];
};

export interface ApiDatabaseSlowQueries {
  query: string;
  executionTime: number;
  date: Timestamp;
}

export interface NbRequestsByHour {
  hour: string;
  nbRequests: number;
}

export interface ApiDatabaseLastAverageQueriesByHour {
  queries: NbRequestsByHour[];
  date: Timestamp;
}

export interface DatabaseError {
  message: string;
  error: true;
}

export interface ApiDatabaseSize {
  size: number;
  numberOfTables: number;
  numberOfTotalRows: number;
  databaseName: string;
}

export interface ApiAWSSingleResourceInstanceResult {
  id?: string;
  name: string;
  status?: string;
  cost: number | string;
  region?: string;
  currency?: string;
  additionnalData?: unknown;
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
  describe(metricType: MetricType): string[];
}

export type PluginMetricMethod = (credentials: GenericCredentialType) => Promise<PluginResult<MetricType>>;
export type PluginConnectorMap = Map<MetricType, PluginMetricMethod>;
