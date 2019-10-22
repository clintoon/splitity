import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SelectionList } from '@web/design/components/SelectionList/SelectionList';
import { GithubAPI, PullRequestState } from '@web/lib/github/github';
import { Text } from '@web/design/components/Text/Text';
import {
  Button,
  ButtonStyle,
  ButtonSize,
} from '@web/design/components/Button/Button';

const Container = styled.div`
  display: flex;
  margin: 50px 0 0 0;
  justify-content: center;
`;

const EmptyBodyContainer = styled.div`
  margin: 8px;
`;

const GithubDashboardPage = (): JSX.Element => {
  useEffect((): void => {
    const effect = async (): Promise<void> => {
      const githubAPI = new GithubAPI();
      const resp = await githubAPI.getCurrentUserPullRequests({
        states: [PullRequestState.Open],
      });
      console.log(resp);
    };
    effect();
  });

  return (
    <Container>
      <SelectionList
        heading="Your pull requests"
        emptyBody={
          <EmptyBodyContainer>
            <Text>
              Add your repos to have your PRs listed{' '}
              <Button styleOf={ButtonStyle.Primary} size={ButtonSize.Small}>
                Click me
              </Button>
            </Text>
          </EmptyBodyContainer>
        }
        items={[]}
      />
    </Container>
  );
};

export { GithubDashboardPage };
