import React from 'react';
import styled from 'styled-components';
import { Text, TextStyle } from '@web/design/components/Text/Text';
import { Color } from '@web/design/styles/color';

interface PullRequestInfoPageProps {
  title: string;
  repoName: string;
  owner: string;
}

const TextGroup = styled.div`
  margin: 30px 60px;
  padding: 0 0 20px 0;
  border-bottom: 2px solid ${Color.Gray500};
`;

const PULL_REQUEST_INFO_TESTID = 'pull request info';

const PullRequestInfoPage = ({
  title,
  owner,
  repoName,
}: PullRequestInfoPageProps): JSX.Element => {
  return (
    <div>
      <TextGroup data-testid={PULL_REQUEST_INFO_TESTID}>
        <Text styleOf={TextStyle.Title3}>{title}</Text>
        <Text styleOf={TextStyle.Title6}>{`${owner}/${repoName}`}</Text>
      </TextGroup>
    </div>
  );
};

export { PullRequestInfoPage, PULL_REQUEST_INFO_TESTID };
