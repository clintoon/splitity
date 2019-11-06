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
import { useCurrentUserPullRequestsQuery } from '@web/lib/apollo/github/useCurrentUserPullRequestsQuery';

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
  const {
    pullRequests,
    loadMore,
    hasNextPage,
  } = useCurrentUserPullRequestsQuery();

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
        items={
          pullRequests
            ? pullRequests.map(
                (val): PullRequestItem => {
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
              )
            : []
        }
        showLoadMore={hasNextPage}
        onLoadMoreClick={loadMore}
      />
    </Container>
  );
};

const GithubDashboardPage = withRouter(WrappedGithubDashboardPage);

export { GithubDashboardPage, EMPTY_BODY_TESTID };
