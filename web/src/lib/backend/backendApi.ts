import axios, { AxiosInstance } from 'axios';
import { getOAuthToken } from '../cookie/authCookie';
import { backendConfig } from '@web/config/backend';

interface SplitPullRequestOptions {
  owner: string;
  repoName: string;
  pullRequestId: number;
  patches: string[];
}

interface LoginOptions {
  token: string;
}

interface SplitPullRequestResult {
  splitPullRequestJobId: string;
}

interface CurrentUserResult {
  userId: number;
}

class BackendAPI {
  private http: AxiosInstance;
  // TODO(clinton): remove old client
  private httpWithAuth: AxiosInstance;

  public constructor() {
    const oAuthToken = getOAuthToken();
    const auth = oAuthToken;

    this.httpWithAuth = axios.create({
      baseURL: backendConfig.backendApiUrl,
      headers: {
        'Access-Token': auth,
      },
    });

    this.http = axios.create({
      baseURL: backendConfig.backendApiUrl,
      withCredentials: true,
    });
  }

  public async splitPullRequest({
    owner,
    repoName,
    pullRequestId,
    patches,
  }: SplitPullRequestOptions): Promise<SplitPullRequestResult> {
    const resp = await this.httpWithAuth({
      method: 'post',
      url: `/v1/repos/${owner}/${repoName}/pulls/${pullRequestId}/split`,
      data: {
        patches,
      },
    });

    return resp.data;
  }

  public async login({ token }: LoginOptions): Promise<void> {
    await this.http({
      method: 'post',
      url: '/v1/auth/login',
      data: {
        token,
      },
    });
  }

  public async getCurrentUser(): Promise<CurrentUserResult> {
    const resp = await this.http({
      method: 'get',
      url: '/v1/current_user',
    });

    return {
      userId: resp.data.user_id,
    };
  }
}

export { BackendAPI };
