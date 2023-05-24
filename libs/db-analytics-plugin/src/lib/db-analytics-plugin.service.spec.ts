import { Test } from '@nestjs/testing';
import { DbAnalyticsPluginService } from './db-analytics-plugin.service';

describe('DbAnalyticsPluginService', () => {
  let service: DbAnalyticsPluginService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DbAnalyticsPluginService],
    }).compile();

    service = module.get(DbAnalyticsPluginService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
