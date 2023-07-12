import { Issues, PullRequests } from '@metrikube/common';
import axios, { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  private axiosInstance = axios.create({
    baseURL: 'https://api.github.com'
  })

  private limit = 10

  constructor() {}

  async getRepoIssues(repoOwner: string, repoName: string, token: string): Promise<Issues> {
    try {
      const { data: issues } = await this.axiosInstance.get<Issues>(`/repos/${repoOwner}/${repoName}/issues&per_page=${this.limit}`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      return issues
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }

  async getRepoPRs(repoOwner: string, repoName: string, token: string): Promise<PullRequests> {
    try {
      const { data: prs } = await this.axiosInstance.get<PullRequests>(`/repos/${repoOwner}/${repoName}/pulls&per_page=${this.limit}`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      return prs
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message)
      }
      throw error
    }
  }
}
