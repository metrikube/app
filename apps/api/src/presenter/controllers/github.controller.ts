import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiGithubError, ApiGithubIssues, ApiGithubPullRequests } from '@metrikube/common';
import { GithubService } from '@metrikube/github-plugin';

import { DiTokens } from '../../infrastructure/di/tokens';

@ApiTags('Github')
@Controller('/github')
export class GithubController {
  constructor(@Inject(DiTokens.GithubServiceToken) private readonly githubService: GithubService) {}

  @Get('/issues')
  @ApiOperation({ summary: 'Get issues from a Github repository' })
  getIssues(@Query('repoOwner') owner: string, @Query('repoName') repo: string, @Query('token') accessToken: string): Promise<ApiGithubIssues[] | ApiGithubError> {
    return this.githubService.getRepoIssues({ repo, owner, accessToken });
  }

  @Get('/prs')
  @ApiOperation({ summary: 'Get pull requests from a Github repository' })
  getPRs(@Query('repoOwner') owner: string, @Query('repoName') repo: string, @Query('token') accessToken: string): Promise<ApiGithubPullRequests[] | ApiGithubError> {
    return this.githubService.getRepoPRs({ repo, owner, accessToken });
  }
}
