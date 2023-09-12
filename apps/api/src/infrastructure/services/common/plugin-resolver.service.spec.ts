import { ApiMonitoringService } from '@metrikube/api-monitoring';
import { ApiEndpointCredentialType, GenericCredentialType, MetricType, PluginResult } from '@metrikube/common';

import { Plugin } from '../../../domain/models/plugin.model';
import { PluginResolverService } from './plugin-resolver.service';

describe('PluginResolverService', () => {
  let service: PluginResolverService;
  let apiMonitoringService: ApiMonitoringService;
  // let AWSService: AWSService;

  beforeEach(async () => {
    apiMonitoringService = {
      async testConnection(credential: ApiEndpointCredentialType): Promise<{ ok: boolean; message: string | null }> {
        return { ok: true, message: null };
      },
      async apiHealthCheck({ apiEndpoint: url }: ApiEndpointCredentialType): Promise<PluginResult<'api-endpoint-health-check'>> {
        return {
          status: 200,
          value: 100,
          unit: 'ms',
          details: null
        };
      },
      describe(type: MetricType): (keyof PluginResult<'api-endpoint-health-check'>)[] {
        return ['status', 'value'];
      }
    };

    service = new PluginResolverService(null, apiMonitoringService, null, null);
  });

  it('should test plugin connection', async () => {
    const plugin = new Plugin('1', 'api endpoint', 'api_endpoint', '', '', '', '', '');
    const credential: GenericCredentialType = { apiEndpoint: 'http://localhost:3000' };
    const mockResult = { ok: true, message: null };

    await apiMonitoringService.testConnection(credential);

    const result = await service.testPluginConnection(plugin, credential as GenericCredentialType);
    expect(result).toEqual(mockResult);
    expect(apiMonitoringService.testConnection).toHaveBeenCalledWith(credential);
  });

  // it('should query plugin data by metric type', async () => {
  //   const type = 'api-endpoint-health-check';
  //   const credentials: GenericCredentialType = { apiEndpoint: 'http://localhost:3000' };
  //   const mockResult = { status: 200, value: 100, unit: 'ms', details: null };
  //
  //   apiMonitoringService.apiHealthCheck.mockResolvedValue(mockResult);
  //
  //   const result = await service.queryPluginDataByMetricType(type, credentials);
  //   expect(result).toEqual(mockResult);
  //   expect(apiMonitoringService.apiHealthCheck).toHaveBeenCalledWith(credentials);
  // });
});
