import { graphql } from '@octokit/graphql';
import { getOAuthToken } from '@web/lib/cookie/authCookie';
import { graphql as Graphql } from '@octokit/graphql/dist-types/types';
import Octokit from '@octokit/rest';
import axios, { AxiosInstance } from 'axios';

export enum PullRequestState {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Merged = 'MERGED',
}

interface GetCurrentUserReposOptions {
  first?: number;
  cursor?: string;
  states?: PullRequestState[];
}

export interface PullRequest {
  title: string;
  number: number;
  repository: {
    url: string;
    nameWithOwner: string;
  };
}

export interface PullRequestPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface GetPullRequestInfo {
  pullRequestId: number;
  repoName: string;
  owner: string;
}

interface GetPullRequestInfoResult {
  title: string;
}

interface GetPullRequestDiff {
  pullRequestId: number;
  repoName: string;
  owner: string;
}

class GithubAPI {
  private graphqlWithAuth: Graphql;
  private restWithAuth: Octokit;
  private httpWithAuth: AxiosInstance;

  public constructor() {
    const oAuthToken = getOAuthToken();
    const auth = `token ${oAuthToken}`;

    this.graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: auth,
      },
    });

    this.restWithAuth = new Octokit({ auth });

    this.httpWithAuth = axios.create({
      baseURL: 'https://api.github.com/',
      headers: {
        Authorization: auth,
      },
    });
  }

  public async getAppInstallationId(userId: number): Promise<number | null> {
    // TODO(clinton): handle the case of multiple installations (more than 100)
    const installations = await this.restWithAuth.apps.listInstallationsForAuthenticatedUser();
    if (installations.data.total_count === 0) {
      return null;
    }

    const userInstallations = installations.data.installations.filter(
      (installation): boolean => {
        return installation.account.id === userId;
      }
    );

    if (userInstallations.length === 0) {
      return null;
    }

    return userInstallations[0].id;
  }

  public async getPullRequestInfo({
    pullRequestId,
    repoName,
    owner,
  }: GetPullRequestInfo): Promise<GetPullRequestInfoResult | null> {
    const resp = await this.graphqlWithAuth(
      `query RepoInfo($owner: String!, $repoName: String!, $pullRequestId: Int!) {
        repository(name: $repoName, owner: $owner) {
          issueOrPullRequest(number: $pullRequestId) {
            ... on PullRequest {
              title,
            }
          }
        }
      }`,
      {
        owner,
        pullRequestId,
        repoName,
      }
    );

    return resp && resp.repository.issueOrPullRequest;
  }

  public async getPullRequestDiff({
    owner,
    repoName,
    pullRequestId,
  }: GetPullRequestDiff): Promise<string> {
    const resp = await this.httpWithAuth({
      url: `/repos/${owner}/${repoName}/pulls/${pullRequestId}.diff`,
      headers: {
        Accept: 'application/vnd.github.v3.diff',
      },
    });

    return resp.data as string;
  }
}

export { GithubAPI };
