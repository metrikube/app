import { Test } from '@nestjs/testing';

import { GithubPluginService } from './github-plugin.service';

describe('GithubPluginService', () => {
  let service: GithubPluginService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GithubPluginService],
    }).compile();

    service = module.get(GithubPluginService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
