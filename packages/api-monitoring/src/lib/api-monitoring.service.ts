import { ApiEndpointCredentialType } from '@metrikube/common';
import { PluginResult } from '@metrikube/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApiMonitoringService {
  constructor() {}

  async apiHealthCheck({ apiEndpoint: url }: ApiEndpointCredentialType): Promise<PluginResult<'api_endpoint_health_check'>> {
    const start = Date.now();
    Logger.log(`Api health check for ${url}`, 'ApiMonitoringService');
    try {
      const response: AxiosResponse = await axios.get(url);
      const end = Date.now();
      const responseTime = end - start;
      Logger.log(`Api health check for ${url} took ${responseTime}ms with status ${response.status}`, 'ApiMonitoringService');

      return {
        status: response.status,
        value: responseTime,
        unit: 'ms',
        details: response.headers
      };
    } catch (error) {
      const end = Date.now();
      const responseTime = end - start;
      return {
        status: (error as AxiosError)?.response?.status || 500,
        value: responseTime,
        unit: 'ms',
        details: (error as Error)?.message || `Unreachable endpoint ${url}`
      };
    }
  }
}
