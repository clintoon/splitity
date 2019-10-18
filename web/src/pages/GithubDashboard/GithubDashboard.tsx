import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SelectionList } from '@web/design/components/SelectionList/SelectionList';
import { GithubAPI, PullRequestState } from '@web/lib/github/github';

const Container = styled.div`
  display: flex;
  margin: 50px 0 0 0;
  justify-content: center;
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
      <SelectionList heading="Your pull requests" items={[]} />
    </Container>
  );
};

export { GithubDashboardPage };
