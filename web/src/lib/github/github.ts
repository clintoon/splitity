import { graphql } from '@octokit/graphql';
import { getOAuthToken } from '@web/lib/cookie/authCookie';
import { graphql as Graphql } from '@octokit/graphql/dist-types/types';

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

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface CurrentUserPullRequestsResult {
  pageInfo: PageInfo;
  nodes: PullRequest[];
}

class GithubAPI {
  private graphqlWithAuth: Graphql;

  public constructor() {
    const oAuthToken = getOAuthToken();
    this.graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${oAuthToken}`,
      },
    });
  }

  public async getCurrentUserPullRequests(
    options?: GetCurrentUserReposOptions
  ): Promise<CurrentUserPullRequestsResult | null> {
    const resp = await this.graphqlWithAuth(
      `query CurrentUserRepos($first: Int = 10, $cursor: String = null, $states: [PullRequestState!]) {
        viewer { 
          pullRequests(first: $first, after: $cursor, states: $states) {
            pageInfo {
              hasNextPage,
              endCursor
            }
            nodes {
              title,
              number,
              repository {
                url,
                nameWithOwner
              }
            }
          }
        }
      }`,
      {
        first: options && options.first,
        cursor: options && options.cursor,
        states: options && options.states,
      }
    );

    return resp && (resp.viewer.pullRequests as CurrentUserPullRequestsResult);
  }
}

export { GithubAPI };
