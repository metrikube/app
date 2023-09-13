import { PluginModel } from '../models/Plugin.model';
import { AWSMetricsMock, ApiMetricsMock, GithubMetricsMock, SqlDatabaseMetricsMock } from './metrics.mock';

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

// PLUGINS
export const AWSPluginMock: PluginModel = {
  id: '15bb7006-9018-495c-bff6-ce36476e1030',
  name: 'Amazon web services',
  type: 'aws',
  category: 'cloud',
  description: 'Cloud provider',
  instruction: "Instructions ",
  // credential: {
  //   type: 'aws',
  //   value: {
  //     accessKeyId: '',
  //     secretAccessKey: '',
  //     region: ''
  //   }
  // },
  metrics: AWSMetricsMock
};

export const githubPluginMock: PluginModel = {
  id: 'f5e90849-9c70-433d-9d66-dac20be2c4e7',
  name: 'Github',
  type: 'github',
  category: 'versioning',
  description: 'Versioning',
  instruction: "Pas d'instruction",
  // credential: {
  //   type: 'github',
  //   value: {
  //     accessToken: '',
  //     owner: '',
  //     repo: ''
  //   }
  // },
  metrics: GithubMetricsMock
};

export const apiHealthCheckPluginMock: PluginModel = {
  id: 'f5e90849-9c70-433d-9d66-dac20be2c4e7',
  name: 'Api heath check',
  type: 'api_endpoint',
  category: 'api',
  description: 'Description',
  instruction: "Pas d'instruction",
  metrics: ApiMetricsMock
}

export const sqlPluginMock: PluginModel = {
  id: 'f5e90849-9c70-433d-9d66-dac20be2c4e7',
  name: 'Base de données - SQL',
  type: 'sql_database',
  category: 'db',
  description: 'Description',
  instruction: "Pas d'instruction",
  metrics: SqlDatabaseMetricsMock
}

export const pluginsMock = [AWSPluginMock, githubPluginMock, sqlPluginMock, apiHealthCheckPluginMock];
