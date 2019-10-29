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
import { noop } from 'lodash';

const Container = styled.div`
  display: flex;
  margin: 50px 0 0 0;
  justify-content: center;
`;

const EmptyBodyContainer = styled.div`
  margin: 8px;
`;

const GithubDashboardPage = (): JSX.Element => {
  // const [pageInfo, setPageInfo] = useState<PullRequestPageInfo>();
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  useEffect((): void => {
    const effect = async (): Promise<void> => {
      const githubAPI = new GithubAPI();
      const prData = await githubAPI.getCurrentUserPullRequests({
        states: [PullRequestState.Open],
      });
      if (prData) {
        setPullRequests([...pullRequests, ...prData.nodes]);
      }
    };
    effect();
  }, []);

  return (
    <Container>
      <PullRequestList
        heading="Your pull requests"
        emptyBody={
          <EmptyBodyContainer>
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
          (val): PullRequestItem => {
            return {
              key: val.number,
              title: val.title,
              repo: val.repository.nameWithOwner,
              onClick: noop,
            };
          }
        )}
      />
    </Container>
  );
};

export { GithubDashboardPage };
