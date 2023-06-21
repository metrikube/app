import { Test } from '@nestjs/testing';

import { AwsPluginService } from '../services/aws-client.service';

describe('AwsPluginService', () => {
  let service: AwsPluginService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AwsPluginService],
    }).compile();

    service = module.get(AwsPluginService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
