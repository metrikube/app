import { GithubCredentialType, Issues, PluginConnectionInterface, PluginResult, PullRequests } from '@metrikube/common';
import axios, { AxiosError } from 'axios';

import { Injectable } from '@nestjs/common';

interface GithubErrorData {
  message: string;
}

@Injectable()
export class GithubService implements PluginConnectionInterface {
  private axiosInstance = axios.create({
    baseURL: 'https://api.github.com'
  });

  private limit = 10;

  constructor() {}

  async getRepoIssues(repoOwner: string, repoName: string, token: string): Promise<PluginResult<'github-last-issues'>> {
    try {
      const { data: issues } = await this.axiosInstance.get<Issues>(`/repos/${repoOwner}/${repoName}/issues&per_page=${this.limit}`, {
        headers: {
          Authorization: `token ${token}`
        }
      });
      return issues;
    } catch (error) {
      return {
        status: (error as AxiosError)?.response?.status || 500,
        message: (error as AxiosError<GithubErrorData>)?.response?.data?.message || null
      };
    }
  }

  async getRepoPRs(repoOwner: string, repoName: string, token: string): Promise<PluginResult<'github-last-prs'>> {
    try {
      const { data: prs } = await this.axiosInstance.get<PullRequests>(`/repos/${repoOwner}/${repoName}/pulls&per_page=${this.limit}`, {
        headers: {
          Authorization: `token ${token}`
        }
      });
      return prs;
    } catch (error) {
      return {
        status: (error as AxiosError)?.response?.status || 500,
        message: (error as AxiosError<GithubErrorData>)?.response?.data?.message || null
      };
    }
  }

  async testConnection(credential: GithubCredentialType) {
    try {
      await this.axiosInstance.get(`/repos/${credential.owner}/${credential.repo}`, {
        headers: {
          Authorization: `token ${credential.accessToken}`
        }
      });

      return { ok: true, message: null };
    } catch (error) {
      return { ok: false, message: (error as AxiosError<GithubErrorData>)?.response?.data.message || null };
    }
  }
}
