import { Module } from '@nestjs/common';
import { GithubPluginService } from './github-plugin.service';

@Module({
  controllers: [],
  providers: [GithubPluginService],
  exports: [GithubPluginService],
})
export class GithubPluginModule {}
