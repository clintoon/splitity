import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { githubClient } from './githubClient';
import undefined = require('firebase/empty-import');
import { noop } from 'lodash';

export enum PullRequestState {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Merged = 'MERGED',
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

export interface CurrentUserPullRequestsQueryData {
  viewer: {
    pullRequests: {
      pageInfo: PullRequestPageInfo;
      nodes: PullRequest[];
    };
  };
}

export interface CurrentUserPullRequestsQueryVars {
  first?: number;
  cursor: string | null;
  states: PullRequestState[];
}

export interface UseCurrentUserPullRequestsQueryResult {
  pullRequests?: PullRequest[];
  loadMore: () => void;
  hasNextPage: boolean;
}

const CURRENT_USER_PULL_REQUESTS_QUERY = gql`
  query CurrentUserPullRequests(
    $first: Int = 5
    $cursor: String = null
    $states: [PullRequestState!]
  ) {
    viewer {
      pullRequests(first: $first, after: $cursor, states: $states) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          title
          number
          repository {
            url
            nameWithOwner
          }
        }
      }
    }
  }
`;

const useCurrentUserPullRequestsQuery = (): UseCurrentUserPullRequestsQueryResult => {
  const { data, fetchMore } = useQuery<
    CurrentUserPullRequestsQueryData,
    CurrentUserPullRequestsQueryVars
  >(CURRENT_USER_PULL_REQUESTS_QUERY, {
    variables: {
      cursor: null,
      states: [PullRequestState.Open],
    },
    client: githubClient,
  });

  if (!data) {
    return {
      pullRequests: undefined,
      loadMore: noop,
      hasNextPage: false,
    };
  }

  const pullRequests = data.viewer.pullRequests.nodes;
  const hasNextPage = data.viewer.pullRequests.pageInfo.hasNextPage;

  const loadMore = (): void => {
    fetchMore({
      variables: {
        cursor: data.viewer.pullRequests.pageInfo.endCursor,
      },
      updateQuery: (
        prev,
        { fetchMoreResult }
      ): CurrentUserPullRequestsQueryData => {
        if (!fetchMoreResult) {
          return prev;
        }

        const nextPageInfo = fetchMoreResult.viewer.pullRequests.pageInfo;
        const prevNodes = prev.viewer.pullRequests.nodes;
        const nextNodes = fetchMoreResult.viewer.pullRequests.nodes;

        return {
          viewer: {
            pullRequests: {
              pageInfo: nextPageInfo,
              nodes: [...prevNodes, ...nextNodes],
            },
          },
        };
      },
    });
  };

  return {
    pullRequests,
    loadMore,
    hasNextPage,
  };
};

export { CURRENT_USER_PULL_REQUESTS_QUERY, useCurrentUserPullRequestsQuery };
