import axios, { AxiosError } from 'axios';

import { Injectable } from '@nestjs/common';

import { ApiGithubError, ApiGithubIssues, GithubCredentialType, Issues, MetricType, PluginConnectionInterface, PullRequests } from '@metrikube/common';

import { InvalidCredentialException } from '../../../../apps/api/src/domain/exceptions/invalid-credential.exception';

interface GithubErrorData {
  message: string;
}

const limit = 5;

// prettier-ignore
@Injectable()
export class GithubService implements PluginConnectionInterface {
  async getRepoIssues({ accessToken, repo, owner }: GithubCredentialType): Promise<ApiGithubIssues[] | ApiGithubError> {
    try {
      const { data: { items: issues } } = await axios.get<{items: Issues}>(`https://api.github.com/search/issues?q=is:issue%20repo:${owner}/${repo}&per_page=${limit}`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      return issues.map(({ title, user: { login }, number, state, html_url }) => ({ title, number, url: html_url, author: login, status: state }));
    } catch (error) {
      return {
        error: true,
        status: (error as AxiosError)?.response?.status || 500,
        message: (error as AxiosError<GithubErrorData>)?.response?.data?.message || null
      };
    }
  }

    async getRepoPRs({ accessToken, repo, owner }: GithubCredentialType): Promise<ApiGithubIssues[] | ApiGithubError> {
    try {
      const { data: prs } = await axios.get<PullRequests>(`https://api.github.com/repos/${owner}/${repo}/pulls?per_page=${limit}&state=all`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      return prs.map(({ title, user: { login }, number, state, html_url }) => ({ title, number, url: html_url, author: login, status: state }));
    } catch (error) {
      return {
        error: true,
        status: (error as AxiosError)?.response?.status || 500,
        message: (error as AxiosError<GithubErrorData>)?.response?.data?.message || null
      };
    }
  }

  async testConnection({ accessToken, repo, owner }: GithubCredentialType): Promise<{ ok: boolean; message: string | null }> {
    try {
      await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      return { ok: true, message: null };
    } catch (error) {
      throw new InvalidCredentialException(error);
    }
  }


  describe(type: MetricType): string[] {
    switch (type) {
      default:
        return [];
    }
  }
}
