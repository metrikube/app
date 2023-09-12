import type { AxiosError } from 'axios';
import axios, { AxiosResponse } from 'axios';

import { Injectable, Logger } from '@nestjs/common';

import { ApiEndpointCredentialType, MetricType, PluginConnectionInterface, PluginResult } from '@metrikube/common';

import { InvalidCredentialException } from '../../../../apps/api/src/domain/exceptions/invalid-credential.exception';

@Injectable()
export class ApiMonitoringService implements PluginConnectionInterface {
  constructor() {}

  async apiHealthCheck({ apiEndpoint: url }: ApiEndpointCredentialType): Promise<PluginResult<'api-endpoint-health-check'>> {
    const start = Date.now();
    Logger.log(`Api health check for ${url}`, ApiMonitoringService.name);
    try {
      const response: AxiosResponse = await axios.get(url);
      const end = Date.now();
      const responseTime = end - start;
      Logger.log(`Ping to "${url}" took ${responseTime}ms with status ${response.status}`, ApiMonitoringService.name);

      return {
        status: response.status,
        value: responseTime,
        unit: 'ms',
        details: `Api responded with status ${response.status} in ${responseTime}ms`
      };
    } catch (error) {
      const end = Date.now();
      const responseTime = end - start;
      Logger.log(`Ping to "${url}" took ${responseTime}ms with status ${(error as AxiosError)?.response?.status}`, ApiMonitoringService.name);
      return {
        status: (error as AxiosError)?.response?.status || 500,
        value: responseTime,
        unit: 'ms',
        details: `Api responded with status ${(error as AxiosError)?.response?.status || 500} in ${responseTime}ms`
      };
    }
  }

  async testConnection(credential: ApiEndpointCredentialType): Promise<{ ok: boolean; message: string | null }> {
    Logger.log(`🏓 Pinging "${credential.apiEndpoint}"`, ApiMonitoringService.name);
    try {
      await axios.get(credential.apiEndpoint);
      return { ok: true, message: null };
    } catch (error) {
      Logger.log(`🏓 Pinging "${credential.apiEndpoint}" failed, status: ${(error as AxiosError)?.status}`, ApiMonitoringService.name);
      throw new InvalidCredentialException(error);
    }
  }

  describe(type: MetricType): (keyof PluginResult<'api-endpoint-health-check'>)[] {
    switch (type) {
      case 'api-endpoint-health-check':
        return ['status', 'value'];
      default:
        return [];
    }
  }
}
