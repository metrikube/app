export const AWSMetricsMock = [
  {
    id: 'aws-1',
    type: 'aws_ec2_single_instance_usage',
    name: 'Cost of EC2 single instance',
    description: 'Description cout et service',
    active: true,
    refreshInterval: 30,
    createdAt: ''
  },
  {
    id: 'aws-metric-2',
    type: 'aws-bucket-single-instance',
    name: 'Cost of Amazon S3 Bucket',
    description: 'Description S3',
    active: true,
    refreshInterval: 30,
    createdAt: ''
  }
];

export const GithubMetricsMock = [
  {
    id: 'github-metric-1',
    type: 'github_last_pr',
    name: 'Last pull requests',
    description: 'Description last PR',
    active: true,
    refreshInterval: 30,
    createdAt: ''
  }
];
