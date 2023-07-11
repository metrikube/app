import { MetricType } from '../metric'

// @ts-ignore
export type PluginResult<T extends MetricType> = ApiResult[T]

export type ApiResult = {
  api_endpoint_health_check: ApiHealthCheckResult
  aws_bucket_single_instance: ApiAWSSingleResourceInstanceResult
  aws_bucket_multiple_instances: ApiAWSSingleResourceInstanceResult[]
  aws_ec2_single_instance_usage: ApiAWSSingleResourceInstanceResult
  aws_ec2_multiple_instances_usage: ApiAWSSingleResourceInstanceResult[]
  github_last_pr: {}
  database_queries: {}
  database_size: {}
  database_slow_queries: {}
}

export interface ApiAWSSingleResourceInstanceResult {
  id: string
  name: string
  status: string
  cost: number
}

export interface ApiHealthCheckResult {
  status: number
  value: number
  unit: string
  details: unknown
}
