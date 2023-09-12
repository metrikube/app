import { BadRequestException, Injectable } from '@nestjs/common';

import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { AWSService } from '@metrikube/aws-plugin';
import { GenericCredentialType, MetricType, PluginConnectionInterface, PluginResult } from '@metrikube/common';
import { DbAnalyticsPluginService } from '@metrikube/db-analytics-plugin';
import { GithubService } from '@metrikube/github-plugin';

import { PluginResolverInterface } from '../../../domain/interfaces/common/plugin-resolver.interface';
import { Plugin } from '../../../domain/models/plugin.model';

@Injectable()
export class PluginResolverService implements PluginResolverInterface {
  constructor(
    private readonly AWSService: AWSService,
    private readonly apiMonitoringService: ApiMonitoringService,
    private readonly databaseService: DbAnalyticsPluginService,
    private readonly githubService: GithubService
  ) {}

  resolvePluginConnector(pluginType: Plugin['type']): PluginConnectionInterface {
    const pluginConnector: Record<Plugin['type'], PluginConnectionInterface> = {
      api_endpoint: this.apiMonitoringService,
      github: this.githubService,
      aws: this.AWSService,
      sql_database: this.databaseService
    };
    return pluginConnector[pluginType];
  }

  testPluginConnection(plugin: Plugin, credentials: GenericCredentialType): Promise<{ ok: boolean; message: string }> {
    const pluginConnector = this.resolvePluginConnector(plugin.type);
    return pluginConnector.testConnection(credentials);
  }

  queryPluginDataByMetricType(type: MetricType, credentials: GenericCredentialType): Promise<PluginResult<MetricType>> {
    const pluginConnector = this.getConnectorByMetricType(type);
    return pluginConnector(credentials);
  }

  describeMetricTrackableFields(pluginType: string, metricType: MetricType): string[] {
    return this.resolvePluginConnector(pluginType).describe(metricType);
  }

  getConnectorByMetricType(type: MetricType): (credentials: GenericCredentialType) => Promise<PluginResult<MetricType>> {
    const connectors: Map<MetricType, (credentials: GenericCredentialType) => Promise<PluginResult<MetricType>>> = new Map<
      MetricType,
      (credentials: GenericCredentialType) => Promise<PluginResult<MetricType>>
    >([
      ['api-endpoint-health-check', this.apiMonitoringService.apiHealthCheck],
      ['aws-bucket-multiple-instances', this.AWSService.getS3Buckets],
      ['aws-bucket-single-instance', this.AWSService.getS3Bucket],
      ['aws-ec2-multiple-instances-usage', this.AWSService.getEc2Instances],
      ['aws-ec2-single-instance-usage', this.AWSService.getEc2Instance],
      ['database-queries', this.databaseService.getNbQueries],
      ['database-size', this.databaseService.getDbSize],
      ['database-slow-queries', this.databaseService.getSlowQuery],
      ['github-last-issues', this.githubService.getRepoIssues],
      ['github-last-prs', this.githubService.getRepoPRs]
    ]);

    if (!connectors.has(type)) throw new BadRequestException(`No connector found for metric type ${type}`);
    return connectors.get(type);
  }
}
