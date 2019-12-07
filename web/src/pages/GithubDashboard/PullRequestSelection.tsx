import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  PullRequestList,
  PullRequestItem,
} from '@web/design/components/PullRequestList/PullRequestList';
import {
  GithubAPI,
  PullRequestState,
  PullRequest,
  PullRequestPageInfo,
} from '@web/lib/github/github';
import { Text } from '@web/design/components/Text/Text';
import {
  Button,
  ButtonStyle,
  ButtonSize,
} from '@web/design/components/Button/Button';
import { onAddReposClick } from '@web/lib/actions/openPage';
import { History } from 'history';
import { GithubRoutePath } from '@web/constants/routes';
import { withRouter, RouteComponentProps } from 'react-router';
import { useStore } from '@web/stores/useStore';

const PULL_REQUEST_SELECTION = 'pull request selection';
const EMPTY_BODY_TESTID = 'empty body testid';

const Container = styled.div`
  display: flex;
  margin: 50px 0 0 0;
  justify-content: center;
`;

const EmptyBodyContainer = styled.div`
  margin: 8px;
`;

const redirectSplitPR = (
  history: History,
  repoNameWithOwner: string,
  prNumber: number
): void => {
  history.push(
    `${GithubRoutePath.AppRoot}/${repoNameWithOwner}/pull/${prNumber}`
  );
};

const WrappedPullRequestSelection = ({
  history,
}: RouteComponentProps): JSX.Element => {
  const store = useStore();
  const [pageInfo, setPageInfo] = useState<PullRequestPageInfo>();
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  useEffect((): void => {
    const effect = async (): Promise<void> => {
      const githubAPI = new GithubAPI();

      const prData = await githubAPI.getCurrentUserPullRequests({
        states: [PullRequestState.Open],
      });
      if (prData) {
        setPageInfo(prData.pageInfo);
        setPullRequests([...pullRequests, ...prData.nodes]);
      }
    };
    effect();
  }, []);

  const loadMoreHandler = async (): Promise<void> => {
    if (pageInfo && pageInfo.hasNextPage) {
      const githubAPI = new GithubAPI();
      const prData = await githubAPI.getCurrentUserPullRequests({
        states: [PullRequestState.Open],
        cursor: pageInfo.endCursor || undefined,
      });
      if (prData) {
        setPageInfo(prData.pageInfo);
        setPullRequests([...pullRequests, ...prData.nodes]);
      }
    }
  };

  const enhancedOnAddReposClick = (): void => {
    const githubInstallationId = store.auth.getGithubInstallationId();

    if (githubInstallationId !== null) {
      onAddReposClick(githubInstallationId);
    }
  };

  return (
    <Container data-testid={PULL_REQUEST_SELECTION}>
      <PullRequestList
        heading="Your pull requests"
        emptyBody={
          <EmptyBodyContainer data-testid={EMPTY_BODY_TESTID}>
            <Text>
              Add your repos to have your PRs listed{' '}
              <Button
                styleOf={ButtonStyle.Primary}
                size={ButtonSize.Small}
                onClick={enhancedOnAddReposClick}
              >
                Click me
              </Button>
            </Text>
          </EmptyBodyContainer>
        }
        items={pullRequests.map(
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
        )}
        showLoadMore={pageInfo && pageInfo.hasNextPage}
        onLoadMoreClick={loadMoreHandler}
      />
    </Container>
  );
};

const PullRequestSelection = withRouter(WrappedPullRequestSelection);

export { PullRequestSelection, EMPTY_BODY_TESTID, PULL_REQUEST_SELECTION };
