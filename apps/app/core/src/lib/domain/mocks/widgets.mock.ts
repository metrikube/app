import { WidgetModel } from '@metrikube/core';

import {
  awsBucketInstanceMetricMock,
  awsListS3MetricMock,
  dbQueriesMock,
  dbSizeMetricMock,
  dbSlowQueriesMetricMock,
  githubLastIssuesMetricMock,
  githubLastPrsMetricMock,
  pingApiMetricMock
} from './metrics.mock';
import { AWSPluginMock, apiHealthCheckPluginMock, githubPluginMock, sqlPluginMock } from './plugins.mock';

// #region API widgets
export const pingApiWidgetMock1: WidgetModel = {
  id: 'ping-api-1',
  name: 'Json placeholder - users',
  resourceId: undefined,
  alertNumber: 4,
  plugin: apiHealthCheckPluginMock,
  metric: pingApiMetricMock,
  data: {
    status: 200,
    value: 100,
    unit: 'ms',
    details: ''
  }
};

export const pingApiWidgetMock2: WidgetModel = {
  id: 'ping-api-1',
  name: 'Json placeholder - users',
  resourceId: undefined,
  alertNumber: 2,
  plugin: apiHealthCheckPluginMock,
  metric: pingApiMetricMock,
  data: {
    status: 400,
    value: 200,
    unit: 'ms',
    details: ''
  }
};

export const pingApiWidgetMock3: WidgetModel = {
  id: 'ping-api-1',
  name: 'Json placeholder - users',
  resourceId: undefined,
  alertNumber: 2,
  plugin: apiHealthCheckPluginMock,
  metric: pingApiMetricMock,
  data: {
    status: 500,
    value: 50,
    unit: 'ms',
    details: ''
  }
};
// #endregion
export const apiWidgets: WidgetModel[] = [pingApiWidgetMock1, pingApiWidgetMock2, pingApiWidgetMock3];

// #region Github widgets
export const lastPullRequestWidgetMock: WidgetModel = {
  id: '094bf35c-5d7c-4e0f-b88c-7372c318b32c',
  name: 'Les 5 dernières Pull Requests',
  resourceId: undefined,
  alertNumber: 0,
  plugin: githubPluginMock,
  metric: githubLastPrsMetricMock,
  data: [
    {
      title: 'Feat/aws',
      number: 95,
      url: 'https://api.github.com/repos/metrikube/app/pulls/95',
      author: 'ImRyuk',
      status: 'closed'
    },
    {
      title: 'style: Rework some components',
      number: 94,
      url: 'https://api.github.com/repos/metrikube/app/pulls/94',
      author: 'Diarit-S',
      status: 'open'
    },
    {
      title: 'refacto : clean hexagonal architecture',
      number: 93,
      url: 'https://api.github.com/repos/metrikube/app/pulls/93',
      author: 'JESSYV96',
      status: 'closed'
    },
    {
      title: 'feat(github-plugin): update to use new endpoints',
      number: 92,
      url: 'https://api.github.com/repos/metrikube/app/pulls/92',
      author: 'louis-genestier',
      status: 'closed'
    },
    {
      title: 'Refacto/optimization',
      number: 91,
      url: 'https://api.github.com/repos/metrikube/app/pulls/91',
      author: 'JESSYV96',
      status: 'closed'
    }
  ]
};

export const lastIssuesWidgetMock: WidgetModel = {
  id: '094bf35c-5d7c-4e0f-b88c-7372c318b',
  name: 'Les 5 dernières issues',
  resourceId: undefined,
  alertNumber: 0,
  plugin: githubPluginMock,
  metric: githubLastIssuesMetricMock,
  data: [
    {
      title: 'Beautify dashboard',
      number: 89,
      url: 'https://github.com/metrikube/app/issues/89',
      author: 'Diarit-S',
      status: 'open'
    },
    {
      title: 'US : Afficher le dashboard avec les métriques choisie',
      number: 62,
      url: 'https://github.com/metrikube/app/issues/62',
      author: 'awuzi',
      status: 'closed'
    },
    {
      title: 'US : Realtime dashbaord',
      number: 61,
      url: 'https://github.com/metrikube/app/issues/61',
      author: 'awuzi',
      status: 'closed'
    },
    {
      title: 'Create a generic card component for metrics',
      number: 56,
      url: 'https://github.com/metrikube/app/issues/56',
      author: 'Diarit-S',
      status: 'closed'
    },
    {
      title: 'Make a function retrieve all plugin category',
      number: 55,
      url: 'https://github.com/metrikube/app/issues/55',
      author: 'JESSYV96',
      status: 'open'
    }
  ]
};
// #endregion
export const githubWidgets: WidgetModel[] = [lastPullRequestWidgetMock, lastIssuesWidgetMock];

// #region AWS widgets
export const singleBucketS3WidgetMock: WidgetModel = {
  id: 'bf32add2-ae8a-42b0-af8f-5a30a851a3ad',
  name: 'AWS S3',
  alertNumber: 1,
  resourceId: 'resource-123',
  plugin: AWSPluginMock,
  metric: awsBucketInstanceMetricMock,
  data: {
    id: 'second-bucket',
    name: 'second-bucket',
    region: 'eu-west-3',
    cost: 74,
    status: 'Stopping',
    currency: 'USD',
    additionnalData: {
      creationDate: '2022-09-06T08:44:09.000Z'
    }
  }
};
export const singleBucketS3Widget2Mock: WidgetModel = {
  id: '094bf35c-5d7c-4e0f-b88c-73318b32c',
  name: 'S3 First Bucket',
  alertNumber: 0,
  resourceId: undefined,
  plugin: AWSPluginMock,
  metric: awsBucketInstanceMetricMock,
  data: {
    id: 'first-bucket',
    name: 'first-bucket',
    region: 'eu-west-3',
    cost: '10',
    status: 'Running',
    currency: 'USD',
    additionnalData: {
      creationDate: '2022-09-03T20:47:09.000Z'
    }
  }
};
export const singleBucketS3Widget3Mock: WidgetModel = {
  id: '094bf35c-5d7c-4e0f-b88c-73318b32c',
  name: 'S3 First Bucket',
  alertNumber: 0,
  resourceId: undefined,
  plugin: AWSPluginMock,
  metric: awsBucketInstanceMetricMock,
  data: {
    id: 'first-bucket',
    name: 'first-bucket',
    region: 'eu-west-3',
    cost: '10',
    currency: 'USD',
    status: 'Stopped',
    additionnalData: {
      creationDate: '2022-09-03T20:47:09.000Z'
    }
  }
};
export const listBucketS3WidgetMock: WidgetModel = {
  id: '20f96417-5333-4dc0-979d-2b4d73f4ec80',
  name: 'AWS S3 List of buckets',
  alertNumber: 0,
  resourceId: 'resource',
  plugin: AWSPluginMock,
  metric: awsListS3MetricMock,
  data: [
    {
      id: 'first-bucket',
      name: 'first-bucket',
      cost: '10',
      currency: 'USD',
      additionnalData: {
        creationDate: '2022-11-17T10:59:05.000Z'
      }
    },
    {
      id: 'second-bucket',
      name: 'second-bucket',
      cost: '7',
      currency: 'USD',
      additionnalData: {
        creationDate: '2022-09-03T20:47:09.000Z'
      }
    },
    {
      id: 'third-bucket',
      name: 'third-bucket',
      cost: '20',
      currency: 'EUR',
      additionnalData: {
        creationDate: '2022-09-06T08:44:09.000Z'
      }
    }
  ]
};
// #endregion
export const awsWidgets: WidgetModel[] = [singleBucketS3WidgetMock, singleBucketS3Widget2Mock, singleBucketS3Widget3Mock, listBucketS3WidgetMock];

// #region SQL widgets
export const nbRequestsPerHour: WidgetModel = {
  id: 'widget-sql-1',
  name: 'MariaDB - Requête par heures (12 dernières heures)',
  alertNumber: 0,
  resourceId: undefined,
  plugin: sqlPluginMock,
  metric: dbQueriesMock,
  data: {
    queries: [
      {
        hour: '2023-09-05 21:00:00',
        nbRequests: 12
      },
      {
        hour: '2023-09-05 22:00:00',
        nbRequests: 33
      },
      {
        hour: '2023-09-05 23:00:00',
        nbRequests: 45
      },
      {
        hour: '2023-09-06 00:00:00',
        nbRequests: 67
      },
      {
        hour: '2023-09-06 01:00:00',
        nbRequests: 34
      },
      {
        hour: '2023-09-06 02:00:00',
        nbRequests: 50
      },
      {
        hour: '2023-09-06 03:00:00',
        nbRequests: 78
      },
      {
        hour: '2023-09-06 04:00:00',
        nbRequests: 67
      },
      {
        hour: '2023-09-06 05:00:00',
        nbRequests: 45
      },
      {
        hour: '2023-09-06 06:00:00',
        nbRequests: 426
      },
      {
        hour: '2023-09-06 07:00:00',
        nbRequests: 677
      },
      {
        hour: '2023-09-06 08:00:00',
        nbRequests: 120
      }
    ],
    date: '2023-09-06T08:40:12.106Z'
  }
};
export const dbSizeWidgetMock: WidgetModel = {
  id: 'db-size213',
  name: 'MariaDB - Taille db',
  resourceId: undefined,
  alertNumber: 0,
  plugin: sqlPluginMock,
  metric: dbSizeMetricMock,
  data: {
    size: 0.0469, // Size en Mb
    numberOfTables: 4,
    numberOfTotalRows: 25,
    databaseName: 'metrikube-test'
  }
};
export const slowQueriesWidgetMock: WidgetModel = {
  id: 'db-size213',
  name: 'Database - Requêtes lente',
  alertNumber: 0,
  resourceId: undefined,
  plugin: sqlPluginMock,
  metric: dbSlowQueriesMetricMock,
  data: [
    {
      executionTime: 1.1004,
      query: 'CREATE SYSTEM_USER ? @? IDENTIFIED BY ?',
      date: '2023-09-05T09:01:45.231Z'
    },
    {
      executionTime: 0.5636,
      query: 'SELECT `UPDATE_TIME` FROM `information_schema` . `TABLES`',
      date: '2023-08-30T06:34:09.059Z'
    },
    {
      executionTime: 0.0916,
      query:
        'SELECT `MAX_TIMER_WAIT` / ? AS `max_execution_time_seconds` , `AVG_TIMER_WAIT` / ? AS `executionTime` , `DIGEST_TEXT` AS QUERY , `LAST_SEEN` AS DATE FROM `performance_schema` . `events_statements_summary_by_digest` WHERE SCHEMA_NAME = ? ORDER BY `max_execution_time_seconds` DESC LIMIT ?',
      date: '2023-09-05T15:44:59.825Z'
    },
    {
      executionTime: 0.232,
      query: 'SHOW TABLES FROM `information_schema`',
      date: '2023-08-30T06:31:58.077Z'
    },
    {
      executionTime: 0.0569,
      query:
        'SELECT `DATE_FORMAT` ( `gl` . `event_time` , ? ) AS SQL_TSI_HOUR , COUNT ( * ) AS `nbRequests` FROM `mysql` . `general_log` `gl` JOIN `performance_schema` . `events_statements_history_long` `ps` ON `gl` . `thread_id` = `ps` . `EVENT_ID` WHERE `ps` . `CURRENT_SCHEMA` = ? AND `gl` . `command_type` = ? AND `gl` . `event_time` >= NOW ( ) - INTERVAL ? SQL_TSI_HOUR GROUP BY SQL_TSI_HOUR ORDER BY SQL_TSI_HOUR',
      date: '2023-09-05T10:44:15.407Z'
    },
    {
      executionTime: 0.1222,
      query: 'SELECT * FROM `performance_schema` . `events_statements_history_long`',
      date: '2023-09-04T11:25:14.743Z'
    },
    {
      executionTime: 0.0501,
      query:
        'WITH `hours` AS ( SELECT `DATE_FORMAT` ( NOW ( ) - INTERVAL `n` SQL_TSI_HOUR , ? ) AS SQL_TSI_HOUR FROM ( SELECT ? AS `n` UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? ) `numbers` ) , `schema_requests` AS ( SELECT `DATE_FORMAT` ( `es` . `EVENT_TIME` , ? ) AS SQL_TSI_HOUR , COUNT ( * ) AS `nbRequests` FROM `mysql` . `general_log` `es` LEFT JOIN `information_schema` . `processlist` `p` ON `es` . `THREAD_ID` = `p` . `ID` WHERE `es` . `EVENT_TIME` >= NOW ( ) - INTERVAL ? SQL_TSI_HOUR AND `p` . `DB` IS NOT NULL GROUP BY SQL_TSI_HOUR ) SELECT `h` . `hour` , `IFNULL` ( `sr` . `nbRequests` , ? ) AS `nbRequests` FROM `hours` `h` LEFT JOIN `schema_requests` `sr` ON `h` . `hour` = `sr` . `hour` WHERE `h` . `hour` >= `DATE_FORMAT` ( NOW ( ) - INTERVAL ? SQL_TSI_HOUR , ? ) AND `h` . `hour` <= `DATE_FORMAT` ( NOW ( ) , ? ) ORDER BY `h` . `hour`',
      date: '2023-09-05T09:50:59.051Z'
    },
    {
      executionTime: 0.1957,
      query: 'SELECT * FROM `setup_consumers` WHERE NAME LIKE ? AND `enabled` = ?',
      date: '2023-09-04T11:17:29.083Z'
    },
    {
      executionTime: 0.0498,
      query:
        'WITH `hours` AS ( SELECT `DATE_FORMAT` ( NOW ( ) - INTERVAL `n` SQL_TSI_HOUR , ? ) AS SQL_TSI_HOUR FROM ( SELECT ? AS `n` UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? ) `numbers` ) SELECT `h` . `hour` , `IFNULL` ( COUNT ( `es` . `EVENT_TIME` ) , ? ) AS `nbRequests` FROM `hours` `h` LEFT JOIN `mysql` . `general_log` `es` ON `DATE_FORMAT` ( `es` . `EVENT_TIME` , ? ) = `h` . `hour` AND `es` . `EVENT_TIME` >= NOW ( ) - INTERVAL ? SQL_TSI_HOUR LEFT JOIN `information_schema` . `processlist` `p` ON `es` . `THREAD_ID` = `p` . `ID` WHERE `p` . `DB` IS NOT NULL GROUP BY `h` . `hour` ORDER BY `h` . `hour`',
      date: '2023-09-05T08:38:36.792Z'
    },
    {
      executionTime: 0.0311,
      query:
        'WITH `hours` AS ( SELECT `DATE_FORMAT` ( NOW ( ) - INTERVAL `n` SQL_TSI_HOUR , ? ) AS SQL_TSI_HOUR , `DATE_FORMAT` ( NOW ( ) - INTERVAL ( `n` - ? ) SQL_TSI_HOUR , ? ) AS `next_hour` FROM ( SELECT ? AS `n` UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? UNION SELECT ? ) `numbers` ) SELECT `h` . `hour` , `IFNULL` ( SUM ( `es` . `COUNT_STAR` ) , ? ) AS `nbRequests` FROM `hours` `h` LEFT JOIN `performance_schema` . `events_statements_summary_by_digest` `es` ON `es` . `QUERY_SAMPLE_SEEN` >= `h` . `hour` AND `es` . `QUERY_SAMPLE_SEEN` < `h` . `next_hour` AND `es` . `SCHEMA_NAME` NOT IN (...) AND `es` . `QUERY_SAMPLE_SEEN` >= NOW ( ) - INTERVAL ? SQL_TSI_HOUR GROUP BY `h` . `hour` ORDER BY `h` . `hour`',
      date: '2023-08-30T06:27:37.560Z'
    }
  ]
};
// #endregion
export const sqlWidgets: WidgetModel[] = [nbRequestsPerHour, dbSizeWidgetMock, slowQueriesWidgetMock];

export const widgetsMock: WidgetModel[] = [...apiWidgets, ...githubWidgets, ...awsWidgets, ...sqlWidgets];
