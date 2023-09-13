import { MetricModel } from "@metrikube/core";

//METRICS
// #region AWS metrics
export const awsSingleEC2InstanceMetricMock: MetricModel = {
  id: 'aws-1',
  type: 'aws-ec2-single-instance-usage',
  name: 'Cost of EC2 single instance',
  // description: "Description cout et service",
  refreshInterval: 30,
  isNotifiable: true
};
export const awsBucketInstanceMetricMock: MetricModel = {
  id: 'aws-metric-2',
  type: 'aws-bucket-single-instance',
  name: 'Cost of Amazon S3 Bucket',
  // description: "Description S3",
  refreshInterval: 30,
  isNotifiable: true
};
export const awsListS3MetricMock: MetricModel = {
    id: '5dda4d85-ec61-49f6-86a5-43e64d2576f7',
    name: 'AWS Bucket multiple instances cost',
    type: 'aws-bucket-multiple-instances',
    refreshInterval: 30,
    isNotifiable: false

}


export const AWSMetricsMock: MetricModel[] = [awsSingleEC2InstanceMetricMock, awsBucketInstanceMetricMock, awsListS3MetricMock];
// #endregion

// #region Github metric
export const githubLastPrsMetricMock: MetricModel = {
  id: 'github-metric-1',
  type: 'github-last-prs',
  name: 'Last pull requests',
  // description: "Description last PR",
  refreshInterval: 30,
  isNotifiable: false
};
export const githubLastIssuesMetricMock: MetricModel = {
  id: 'github-metric-21432',
  type: 'github-last-issues',
  name: 'Last Issues',
  // description: "Description last PR",
  refreshInterval: 30,
  isNotifiable: false
};
export const GithubMetricsMock: MetricModel[] = [githubLastPrsMetricMock, githubLastIssuesMetricMock];
// #endregion

// #region API metrics
export const pingApiMetricMock: MetricModel = {
  id: 'api-metric-1',
  type: 'api-endpoint-health-check',
  name: 'API Healthcheck',
  // description: "Description last PR",
  refreshInterval: 30,
  isNotifiable: true
}
export const ApiMetricsMock: MetricModel[] = [pingApiMetricMock];

// #endregion

// #region SQL database metrics
export const dbSizeMetricMock: MetricModel = {
  id: 'sql-metric-1',
  type: 'database-size',
  name: 'Taille base de données',
  // description: "Description last PR",
  refreshInterval: 30,
  isNotifiable: true
}

export const dbSlowQueriesMetricMock: MetricModel = {
  id: 'sql-metric-1',
  type: 'database-slow-queries',
  name: 'Requête lente',
  // description: "Description last PR",
  refreshInterval: 30,
  isNotifiable: false
}

export const dbQueriesMock: MetricModel = {
  id: 'sql-metric-1',
  type: 'database-queries',
  name: 'Nombre de Requête',
  // description: "Description last PR",
  refreshInterval: 30,
  isNotifiable: false
}

export const SqlDatabaseMetricsMock: MetricModel[] = [dbSizeMetricMock, dbSlowQueriesMetricMock, dbQueriesMock];
// #endregion