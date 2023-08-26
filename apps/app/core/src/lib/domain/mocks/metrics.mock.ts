import { MetricModel } from "@metrikube/core";

// METRICS
export const awsSingleInstance: MetricModel = {
    id: 'aws-1',
    type: 'aws-ec2-single-instance-usage',
    name: 'Cost of EC2 single instance',
    // description: "Description cout et service",
    refreshInterval: 30,
    isNotifiable: true
  };
  export const awsBucketInstance: MetricModel = {
    id: 'aws-metric-2',
    type: 'aws-bucket-single-instance',
    name: 'Cost of Amazon S3 Bucket',
    // description: "Description S3",
    refreshInterval: 30,
    isNotifiable: true
  };
  export const githubLastPrs: MetricModel = {
    id: 'github-metric-1',
    type: 'github-last-prs',
    name: 'Last pull requests',
    // description: "Description last PR",
    refreshInterval: 30,
    isNotifiable: true
  };

  export const githubLastIssues: MetricModel = {
    id: 'github-metric-1',
    type: 'github-last-issues',
    name: 'Last Issues',
    // description: "Description last PR",
    refreshInterval: 30,
    isNotifiable: false
  };