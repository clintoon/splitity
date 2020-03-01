import axios, { AxiosInstance } from 'axios';
import { getOAuthToken } from '../cookie/authCookie';
import { backendConfig } from '@web/config/backend';

interface SplitPullRequestOptions {
  owner: string;
  repoName: string;
  pullRequestId: number;
  patches: string[];
}

interface GetPullRequestDiffOptions {
  owner: string;
  repoName: string;
  pullRequestId: number;
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

interface GithubAppInstallation {
  installationId: number;
  accountId: number;
}

type GithubAppInstallationsResult = GithubAppInstallation[];

const getAuthHeaders = (): AuthHeaders => {
  return {
    headers: {
      'Access-Token': getOAuthToken(),
    },
  };
};

interface GetPullRequestDiffResult {
  diff: string;
  title: string;
}

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

  public async getGithubAppInstallations(): Promise<
    GithubAppInstallationsResult
  > {
    const resp = await this.http({
      method: 'get',
      url: '/v1/current_user/github_app_installations',
      ...getAuthHeaders(),
    });

    return resp.data.installations.map(
      (installation: {
        account_id: number;
        installation_id: number;
      }): GithubAppInstallation => {
        return {
          accountId: installation.account_id,
          installationId: installation.installation_id,
        };
      }
    );
  }

  public async getPullRequestDiff({
    owner,
    repoName,
    pullRequestId,
  }: GetPullRequestDiffOptions): Promise<GetPullRequestDiffResult> {
    const resp = await this.http({
      method: 'get',
      url: `/v1/repos/${owner}/${repoName}/pulls/${pullRequestId}/diff`,
      ...getAuthHeaders(),
    });

    return resp.data;
  }
}

export { BackendAPI };
