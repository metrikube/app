export type MetricType =
  | 'api-endpoint-health-check'
  | 'aws-bucket-single-instance'
  | 'aws-bucket-multiple-instances'
  | 'aws-ec2-multiple-instances-usage'
  | 'aws-ec2-single-instance-usage'
  | 'github-last-prs'
  | 'github-last-issues'
  | 'database-queries'
  | 'database-size'
  | 'database-slow-queries'
  | 'database-connections';
