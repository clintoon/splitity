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
  code: string;
}

interface SplitPullRequestResult {
  splitPullRequestJobId: string;
}

interface LoginResult {
  accessToken: string;
}

interface CurrentUserResult {
  userId: number;
}

interface AuthHeaders {
  headers: {
    'Access-Token': string | undefined;
  };
}

type GithubAppInstallationsResult = {
  github_app_id: number;
  account_id: number;
}[];

const getAuthHeaders = (): AuthHeaders => {
  return {
    headers: {
      'Access-Token': getOAuthToken(),
    },
  };
};

class BackendAPI {
  private http: AxiosInstance;

  public constructor() {
    this.http = axios.create({
      baseURL: backendConfig.backendApiUrl,
    });
  }

  public async splitPullRequest({
    owner,
    repoName,
    pullRequestId,
    patches,
  }: SplitPullRequestOptions): Promise<SplitPullRequestResult> {
    const resp = await this.http({
      method: 'post',
      url: `/v1/repos/${owner}/${repoName}/pulls/${pullRequestId}/split`,
      data: {
        patches,
      },
      ...getAuthHeaders(),
    });

    return resp.data;
  }

  public async login({ code }: LoginOptions): Promise<LoginResult> {
    const resp = await this.http({
      method: 'post',
      url: '/v1/auth/login',
      data: {
        code,
      },
    });

    return {
      accessToken: resp.data.access_token,
    };
  }

  public async getCurrentUser(): Promise<CurrentUserResult> {
    const resp = await this.http({
      method: 'get',
      url: '/v1/current_user',
      ...getAuthHeaders(),
    });

    return {
      userId: resp.data.user_id,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getGithubAppInstallations(): Promise<
    GithubAppInstallationsResult
  > {
    const resp = await this.http({
      method: 'get',
      url: '/v1/current_user/github_app_installations',
      ...getAuthHeaders(),
    });

    console.log('resp', resp);

    return resp.data.installations;
  }
}

export { BackendAPI };
