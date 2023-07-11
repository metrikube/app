import { ApiEndpointCredentialType } from '@metrikube/common'
import { PluginResult } from '@metrikube/common'
import axios, { AxiosResponse } from 'axios'

import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ApiMonitoringService {
  constructor() {}

  async apiHealthCheck({ apiEndpoint: url }: ApiEndpointCredentialType): Promise<PluginResult<'api_endpoint_health_check'>> {
    try {
      Logger.log(`Api health check for ${url}`, 'ApiMonitoringService')
      const start = Date.now()
      const response: AxiosResponse = await axios.get(url)
      const end = Date.now()
      const responseTime = end - start

      Logger.log(`Api health check for ${url} took ${responseTime}ms with status ${response.status}`, 'ApiMonitoringService')
      return {
        status: response.status,
        value: responseTime,
        unit: 'ms',
        details: response.headers
      }
    } catch (error) {
      return {
        status: 500,
        value: 0,
        unit: 'ms',
        details: (error as Error)?.message || `Unreachable endpoint ${url}`
      }
    }
  }
}
