import { Test } from '@nestjs/testing'

import { ApiMonitoringService } from './api-monitoring.service'

describe('ApiMonitoringService', () => {
  let service: ApiMonitoringService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiMonitoringService]
    }).compile()

    service = module.get(ApiMonitoringService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
