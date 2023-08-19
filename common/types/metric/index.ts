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

export enum MetricTypeEnum {
  ApiEndpointHealthCheck = 'api-endpoint-health-check',
  AwsBucketMultipleInstances = 'aws-bucket-multiple-instances',
  AwsBucketSingleInstance = 'aws-bucket-single-instance',
  AwsEc2MultipleInstancesUsage = 'aws-ec2-multiple-instances-usage',
  AwsEc2SingleInstanceUsage = 'aws-ec2-single-instance-usage',
  DatabaseConnections = 'database-connections',
  DatabaseQueries = 'database-queries',
  DatabaseSize = 'database-size',
  DatabaseSlowQueries = 'database-slow-queries',
  GithubLastIssues = 'github-last-issues',
  GithubLastPrs = 'github-last-prs'
}
