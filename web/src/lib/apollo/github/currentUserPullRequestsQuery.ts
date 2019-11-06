import { gql } from 'apollo-boost';

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

export { CURRENT_USER_PULL_REQUESTS_QUERY };
