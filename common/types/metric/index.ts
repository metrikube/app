export type MetricType =
  | 'api_endpoint_health_check'
  | 'aws_bucket_single_instance'
  | 'aws_bucket_multiple_instances'
  | 'aws_ec2_multiple_instances_usage'
  | 'aws_ec2_single_instance_usage'
  | 'github_last_pr'
  | 'database_queries'
  | 'database_size'
  | 'database_slow_queries';
