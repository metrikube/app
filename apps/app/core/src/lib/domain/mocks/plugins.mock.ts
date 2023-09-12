import { MetricModel } from '../models/Metric.model';
import { PluginModel } from '../models/Plugin.model';
import { awsSingleInstance, awsBucketInstance, githubLastPrs } from './metrics.mock';

export const providerCategoriesMock = [
  {
    label: 'Tous',
    value: ''
  },
  {
    label: 'Cloud',
    value: 'cloud'
  },
  {
    label: 'Base de données',
    value: 'db'
  },
  {
    label: 'Gestion de version',
    value: 'versionning'
  },
  {
    label: 'API',
    value: 'api'
  }
];

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
