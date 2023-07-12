import { Module } from '@nestjs/common';
import { GithubService } from './github-plugin.service';

@Module({
  controllers: [],
  providers: [GithubService],
  exports: [GithubService]
})
export class GithubPluginModule {}
