import { MetricModel } from '../models/Metric.model';
import { PluginModel } from '../models/Plugin.model';

export const providerCategoriesMock = [
  {
    label: 'Cloud',
    value: 'cloud'
  },
  {
    label: 'Database',
    value: 'db'
  },
  {
    label: 'Versioning',
    value: 'versionning'
  },
  {
    label: 'API',
    value: 'api'
  }
];

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

export const AWSMetricsMock: MetricModel[] = [awsSingleInstance, awsBucketInstance];

export const GithubMetricsMock: MetricModel[] = [githubLastPrs];

// PLUGINS
export const AWSProviderMock: PluginModel = {
  id: '15bb7006-9018-495c-bff6-ce36476e1030',
  name: 'Amazon web services',
  type: 'aws',
  category: 'cloud',
  description: 'Cloud provider',
  instruction:
    '*1. Create an IAM user with the following permissions:*\n- AmazonEC2ReadOnlyAccess, AmazonS3ReadOnlyAccess, AmazonSNSReadOnlyAccess [...] \n*2. Create a new credential with the following parameters:* \n*3. Enjoy!*',
  credential: {
    type: 'aws',
    value: {
      accessKeyId: '',
      secretAccessKey: '',
      region: ''
    }
  },
  metrics: AWSMetricsMock
};

export const githubProviderMock: PluginModel = {
  id: 'f5e90849-9c70-433d-9d66-dac20be2c4e7',
  name: 'Github',
  type: 'github',
  category: 'versioning',
  description: 'Versioning',
  instruction: "Pas d'instruction",
  credential: {
    type: 'github',
    value: {
      accessToken: '',
      owner: '',
      repo: ''
    }
  },
  metrics: GithubMetricsMock
};

export const providersMock = [AWSProviderMock, githubProviderMock];
