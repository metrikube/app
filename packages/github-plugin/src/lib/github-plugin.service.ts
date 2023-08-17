import axios, { AxiosError } from 'axios';

import { Injectable } from '@nestjs/common';

import { ApiGithubError, ApiGithubIssues, ApiGithubPullRequests, GithubCredentialType, Issues, PluginConnectionInterface, PullRequests } from '@metrikube/common';

interface GithubErrorData {
  message: string;
}

// prettier-ignore
@Injectable()
export class GithubService implements PluginConnectionInterface {
  axiosInstance = axios.create({
    baseURL: 'https://api.github.com'
  });

  private limit = 5;

  async getRepoIssues({ accessToken, repo, owner }: GithubCredentialType): Promise<ApiGithubIssues[] | ApiGithubError> {
    try {
      const { data: issues } = await this.axiosInstance.get<Issues>(`/repos/${owner}/${repo}/issues?per_page=${this.limit}`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      return issues.map(({ title, user: { login }, number, state, url }) => ({ title, number, url, author: login, status: state }));
    } catch (error) {
      return {
        error: true,
        status: (error as AxiosError)?.response?.status || 500,
        message: (error as AxiosError<GithubErrorData>)?.response?.data?.message || null
      };
    }
  }

  async getRepoPRs({ accessToken, repo, owner }: GithubCredentialType): Promise<ApiGithubPullRequests[] | ApiGithubError> {
    try {
      const { data: prs } = await this.axiosInstance.get<PullRequests>(`/repos/${owner}/${repo}/pulls?per_page=${this.limit}`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      return prs.map(({ title, user: { login }, number, state, url }) => ({ title, number, url, author: login, status: state }));
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
      await this.axiosInstance.get(`/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });

      return { ok: true, message: null };
    } catch (error) {
      return { ok: false, message: (error as AxiosError<GithubErrorData>)?.response?.data.message || null };
    }
  }
}
