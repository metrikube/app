import { randomUUID } from 'crypto';
import { EntityTarget, MigrationInterface, ObjectLiteral, QueryRunner } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { AlertEntity } from '../../apps/api/src/infrastructure/database/entities/alert.entity';
import { CredentialEntity } from '../../apps/api/src/infrastructure/database/entities/credential.entity';
import { MetricEntity } from '../../apps/api/src/infrastructure/database/entities/metric.entity';
import { PluginEntity } from '../../apps/api/src/infrastructure/database/entities/plugin.entity';
import { PluginToMetricEntity } from '../../apps/api/src/infrastructure/database/entities/plugin_to_metric.entity';

export class SeedDefaultDatabase1693679995600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pluginIds = {
      aws: randomUUID(),
      sql: randomUUID(),
      github: randomUUID(),
      apiHealthCheck: randomUUID()
    };

    const metricIds = {
      apiHealthCheck: randomUUID(),
      awsEc2SingleInstanceUsage: randomUUID(),
      awsEc2MultipleInstancesUsage: randomUUID(),
      githubLastIssues: randomUUID(),
      sqlDatabaseQueries: randomUUID(),
      sqlDatabaseSlowQueries: randomUUID(),
      sqlDatabaseSize: randomUUID()
    };

    const credentialIds = {
      apiHealthCheck: randomUUID(),
      github: randomUUID()
    };

    const pluginToMetricIds = {
      pingApi: randomUUID()
    };

    const plugins = [
      {
        id: pluginIds.aws,
        name: 'AWS',
        type: 'aws',
        description: 'Amazon Web Services Plugin',
        instruction: '...waiting for instruction...',
        category: 'cloud',
        credentialType: 'aws',
        iconUrl: ''
      },
      {
        id: pluginIds.sql,
        name: 'SQL Database',
        type: 'sql_database',
        description: 'SQL Database Plugin',
        instruction: '...waiting for instruction...',
        category: 'db',
        credentialType: 'dbConnection'
      },
      {
        id: pluginIds.github,
        name: 'Github',
        type: 'github',
        description: 'Github Plugin',
        instruction: '...waiting for instruction...',
        category: 'versionning',
        credentialType: 'github',
        iconUrl: ''
      },
      {
        id: pluginIds.apiHealthCheck,
        name: 'API Health Check',
        type: 'api_endpoint',
        description: 'API Health Check Plugin',
        instruction: '...waiting for instruction...',
        category: 'api',
        credentialType: 'apiEndpoint',
        iconUrl: ''
      }
    ];
    const metrics = [
      {
        id: metricIds.apiHealthCheck,
        type: 'api-endpoint-health-check',
        name: 'Ping Api',
        pluginId: pluginIds.apiHealthCheck,
        isNotifiable: true
      },
      {
        id: metricIds.awsEc2SingleInstanceUsage,
        type: 'aws-ec2-single-instance-usage',
        name: 'AWS EC2 instance cost',
        pluginId: pluginIds.aws,
        isNotifiable: true
      },
      {
        id: metricIds.awsEc2MultipleInstancesUsage,
        type: 'aws-ec2-multiple-instances-usage',
        name: 'AWS EC2 multiple instance cost',
        pluginId: pluginIds.aws,
        isNotifiable: false
      },
      {
        id: metricIds.githubLastIssues,
        type: 'github-last-issues',
        name: 'Github last ussues',
        pluginId: pluginIds.github,
        isNotifiable: false
      },
      {
        id: metricIds.sqlDatabaseQueries,
        type: 'database-queries',
        name: 'SQL Database Usage',
        pluginId: pluginIds.sql,
        isNotifiable: false
      },
      {
        id: metricIds.sqlDatabaseSlowQueries,
        type: 'database-slow-queries',
        name: 'SQL Database Slow Queries',
        pluginId: pluginIds.sql,
        isNotifiable: false
      },
      {
        id: metricIds.sqlDatabaseSize,
        type: 'database-size',
        name: 'SQL Database Size',
        pluginId: pluginIds.sql,
        isNotifiable: false
      }
    ];
    const credentials = [
      {
        id: credentialIds.apiHealthCheck,
        pluginId: pluginIds.apiHealthCheck,
        type: 'apiEndpoint',
        value: 'eyJhcGlFbmRwb2ludCI6ICJodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdXNlcnMifQo='
      },
      {
        id: credentialIds.github,
        pluginId: pluginIds.github,
        type: 'github',
        value:
          'eyJhY2Nlc3NUb2tlbiI6ImdpdGh1Yl9wYXRfMTFBS1RYRFBBMHhVUGUzbFRUOTFXNl9CMXJzd1hwRGJCU01NTVZUUmdESE1PTUFVTHMwSkV3NlZpaHlYVjd3MFd1V01NTEZHUjRQZDNHVnA3UCIsIm93bmVyIjoibWV0cmlrdWJlIiwicmVwbyI6ImFwcCJ9'
      }
    ];
    const pluginToMetrics = [
      {
        id: pluginToMetricIds.pingApi,
        pluginId: pluginIds.apiHealthCheck,
        metricId: metricIds.apiHealthCheck,
        credentialId: credentialIds.apiHealthCheck,
        isActive: true,
        resourceId: '',
        name: "Ping l'api jsonplaceholder",
        description: null
      }
    ];
    const alerts = [
      {
        id: '5607a60c-1dc9-455e-817a-59c3f82a176b',
        pluginToMetricId: pluginToMetricIds.pingApi,
        label: 'API Response Time > 50ms',
        triggered: false,
        isActive: true,
        condition: {
          field: 'value',
          operator: 'gte',
          threshold: 50
        }
      }
    ];

    await this.execute(queryRunner, PluginEntity, plugins);
    await this.execute(queryRunner, MetricEntity, metrics);
    await this.execute(queryRunner, CredentialEntity, credentials);
    await this.execute(queryRunner, PluginToMetricEntity, pluginToMetrics);
    await this.execute(queryRunner, AlertEntity, alerts);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM alert WHERE id');
    await queryRunner.query('DELETE FROM credential WHERE id');
    await queryRunner.query('DELETE FROM plugin_to_metric WHERE id');
    await queryRunner.query('DELETE FROM metric WHERE id');
    await queryRunner.query('DELETE FROM plugin WHERE id');
  }

  execute(queryRunner: QueryRunner, entity: EntityTarget<ObjectLiteral>, values: QueryDeepPartialEntity<ObjectLiteral> | QueryDeepPartialEntity<ObjectLiteral>[]): Promise<unknown> {
    return queryRunner.manager.createQueryBuilder().insert().into(entity).values(values).execute();
  }
}
