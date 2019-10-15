import { graphql } from '@octokit/graphql';
import { getOAuthToken } from '@web/lib/cookie/authCookie';
import { graphql as Graphql } from '@octokit/graphql/dist-types/types';

interface GetCurrentUserReposOptions {
  first: number;
}

interface Repository {
  name: string;
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

  public async getCurrentUserRepos(
    options?: GetCurrentUserReposOptions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<Repository[] | null> {
    const resp = await this.graphqlWithAuth(
      `query CurrentUserRepos($first: Int = 10) {
      viewer {
        repositories(first:$first) {
          nodes {
            name
          }
        }
      }
    }`,
      {
        first: options && options.first,
      }
    );

    return resp && resp.viewer.repositories.nodes;
  }
}

export { GithubAPI };
