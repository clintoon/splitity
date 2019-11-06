/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import {
  PullRequestList,
  PullRequestItem,
} from '@web/design/components/PullRequestList/PullRequestList';
import { Text } from '@web/design/components/Text/Text';
import {
  Button,
  ButtonStyle,
  ButtonSize,
} from '@web/design/components/Button/Button';
import { onAddReposClick } from '@web/lib/actions/openPage';
import { History } from 'history';
import { GithubRoutePath } from '@web/constants/routes';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_PULL_REQUESTS_QUERY } from '@web/lib/apollo/github/currentUserPullRequestsQuery';
import { PullRequestState } from '@web/lib/github/github';
import { githubClient } from '@web/lib/apollo/github/githubClient';

const Container = styled.div`
  display: flex;
  margin: 50px 0 0 0;
  justify-content: center;
`;

const EmptyBodyContainer = styled.div`
  margin: 8px;
`;

const EMPTY_BODY_TESTID = 'empty body testid';

const redirectSplitPR = (
  history: History,
  repoNameWithOwner: string,
  prNumber: number
): void => {
  history.push(`${GithubRoutePath.AppRoot}/${repoNameWithOwner}/${prNumber}`);
};

const WrappedGithubDashboardPage = ({
  history,
}: RouteComponentProps): JSX.Element => {
  const { data, fetchMore } = useQuery(CURRENT_USER_PULL_REQUESTS_QUERY, {
    variables: {
      states: [PullRequestState.Open],
    },
    client: githubClient,
  });

  const pageInfo = data && data.viewer.pullRequests.pageInfo;
  const pullRequests = data ? data.viewer.pullRequests.nodes : [];

  return (
    <Container>
      <PullRequestList
        heading="Your pull requests"
        emptyBody={
          <EmptyBodyContainer data-testid={EMPTY_BODY_TESTID}>
            <Text>
              Add your repos to have your PRs listed{' '}
              <Button
                styleOf={ButtonStyle.Primary}
                size={ButtonSize.Small}
                onClick={onAddReposClick}
              >
                Click me
              </Button>
            </Text>
          </EmptyBodyContainer>
        }
        items={pullRequests.map(
          (val: any): PullRequestItem => {
            return {
              key: val.number,
              title: val.title,
              repo: val.repository.nameWithOwner,
              onClick: (): void => {
                redirectSplitPR(
                  history,
                  val.repository.nameWithOwner,
                  val.number
                );
              },
            };
          }
        )}
        showLoadMore={pageInfo && pageInfo.hasNextPage}
        onLoadMoreClick={(): void => {
          fetchMore({
            variables: {
              cursor: data.viewer.pullRequests.pageInfo.endCursor,
            },
            updateQuery: (prev, { fetchMoreResult }): any => {
              if (!fetchMoreResult) {
                return prev;
              }

              const nextPageInfo = (fetchMoreResult as any).viewer.pullRequests
                .pageInfo;
              const prevNodes = (prev as any).viewer.pullRequests.nodes;
              const nextNodes = (fetchMoreResult as any).viewer.pullRequests
                .nodes;

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
        }}
      />
    </Container>
  );
};

const GithubDashboardPage = withRouter(WrappedGithubDashboardPage);

export { GithubDashboardPage, EMPTY_BODY_TESTID };
