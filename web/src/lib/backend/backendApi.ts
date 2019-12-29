import axios, { AxiosInstance } from 'axios';
import { getOAuthToken } from '../cookie/authCookie';
import { backendConfig } from '@web/config/backend';
import { FileDiff } from '../parseDiff/parseDiff';

interface SplitPullRequestOptions {
  owner: string;
  repoName: string;
  pullRequestId: number;
  fileDiffs: FileDiff[];
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
    fileDiffs,
  }: SplitPullRequestOptions): Promise<SplitPullRequestResult> {
    const resp = await this.httpWithAuth({
      method: 'post',
      url: `/v1/repos/${owner}/${repoName}/pulls/${pullRequestId}/split`,
      data: {
        fileDiffs,
      },
    });

    return resp.data;
  }
}

export { BackendAPI };
