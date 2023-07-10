import { MetricType } from '../metric';

export type PluginResult<T extends MetricType> = ApiResult[T];

export type ApiResult = {
  api_endpoint_health_check: ApiHealthCheckResult;
  aws_bucket_single_instance: ApiAwsBucketSingleInstanceResult;
  aws_bucket_multiple_instances: {};
  aws_ec2_multiple_instances_usage: {};
  aws_ec2_single_instance_usage: {};
  github_last_pr: {};
  database_queries: {};
  database_size: {};
  database_connections: {};
  database_slow_queries: {};
};

export interface ApiAwsBucketSingleInstanceResult {
  id: string;
  name: string;
  status: string;
  cost: number;
}

export interface ApiHealthCheckResult {
  status: number;
  value: number;
  unit: string;
  details: unknown;
}
