import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Issues, PluginResult, PullRequests } from '@metrikube/common';
import { GithubService } from '@metrikube/github-plugin';

import { DiTokens } from '../../infrastructure/di/tokens';

@ApiTags('Github')
@Controller('/github')
export class GithubController {
  constructor(@Inject(DiTokens.GithubServiceToken) private readonly githubService: GithubService) {}

  @Get('/issues')
  @ApiOperation({ summary: 'Get issues from a Github repository' })
  getIssues(@Query('repoOwner') repoOwner: string, @Query('repoName') repoName: string, @Query('token') token: string): Promise<PluginResult<'github-last-issues'>> {
    return this.githubService.getRepoIssues(repoOwner, repoName, token);
  }

  @Get('/prs')
  @ApiOperation({ summary: 'Get pull requests from a Github repository' })
  getPRs(@Query('repoOwner') repoOwner: string, @Query('repoName') repoName: string, @Query('token') token: string): Promise<PluginResult<'github-last-prs'>> {
    return this.githubService.getRepoPRs(repoOwner, repoName, token);
  }
}
