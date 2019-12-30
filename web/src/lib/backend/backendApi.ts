import axios, { AxiosInstance } from 'axios';
import { getOAuthToken } from '../cookie/authCookie';
import { backendConfig } from '@web/config/backend';

interface SplitPullRequestOptions {
  owner: string;
  repoName: string;
  pullRequestId: number;
  patch: string;
}

interface SplitPullRequestResult {
  splitPullRequestJobId: string;
}

class BackendAPI {
  private httpWithAuth: AxiosInstance;

  public constructor() {
    const oAuthToken = getOAuthToken();
    const auth = `token ${oAuthToken}`;

    this.httpWithAuth = axios.create({
      baseURL: backendConfig.backendApiUrl,
      headers: {
        Authorization: auth,
      },
    });
  }

  public async splitPullRequest({
    owner,
    repoName,
    pullRequestId,
    patch,
  }: SplitPullRequestOptions): Promise<SplitPullRequestResult> {
    const resp = await this.httpWithAuth({
      method: 'post',
      url: `/v1/repos/${owner}/${repoName}/pulls/${pullRequestId}/split`,
      data: {
        patch,
      },
    });

    return resp.data;
  }
}

export { BackendAPI };
