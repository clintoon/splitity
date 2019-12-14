import React, { useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { GithubAPI } from '@web/lib/github/github';
import { PullRequestInfoPage } from '@web/pages/PullRequestSplittingPage/PullRequestInfo';
import parseDiff from 'parse-diff';
import { FileDiff } from '@web/design/components/FileDiff/FileDiff';
import styled from 'styled-components';

interface MatchProps {
  owner: string;
  repoName: string;
  pullRequestId: string;
}

interface PullRequestSplittingPageProps {
  match: match<MatchProps>;
}

const useGetPRTitle = (
  owner: string,
  repoName: string,
  pullRequestId: number
): string | undefined => {
  const [title, setTitle] = useState();

  useEffect((): void => {
    const callback = async (): Promise<void> => {
      const githubApi = new GithubAPI();
      const res = await githubApi.getPullRequestInfo({
        owner,
        repoName,
        pullRequestId: Number(pullRequestId),
      });

      if (res) {
        setTitle(res.title);
      }
    };
    callback();
  }, []);
  return title;
};

const useGetPRDiff = (
  owner: string,
  repoName: string,
  pullRequestId: number
): parseDiff.File[] | undefined => {
  const [PRDiff, setPRDiff] = useState<parseDiff.File[]>();
  useEffect((): void => {
    const callback = async (): Promise<void> => {
      const githubApi = new GithubAPI();
      const fileDiffs = await githubApi.getPullRequestDiff({
        owner,
        repoName,
        pullRequestId,
      });

      setPRDiff(fileDiffs);
    };
    callback();
  }, []);

  return PRDiff;
};

const FileDiffsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
`;

const FileDiffContainer = styled.div`
  margin: 0 0 20px 0;
`;

const PullRequestSplittingPage = ({
  match,
}: PullRequestSplittingPageProps): JSX.Element => {
  const { owner, repoName, pullRequestId } = match.params;
  const title = useGetPRTitle(owner, repoName, Number(pullRequestId));
  const PRDiff = useGetPRDiff(owner, repoName, Number(pullRequestId));

  const PullRequestFileDiffs = (): JSX.Element => {
    if (!PRDiff) {
      return <div>Loading...</div>;
    }
    return (
      <FileDiffsSection>
        {PRDiff.map(
          (fileDiff): JSX.Element => {
            return (
              <FileDiffContainer key={`${fileDiff.from} ${fileDiff.to}`}>
                <FileDiff
                  filename={{ from: fileDiff.from, to: fileDiff.to }}
                  chunks={fileDiff.chunks}
                />
              </FileDiffContainer>
            );
          }
        )}
      </FileDiffsSection>
    );
  };

  return (
    <div>
      <PullRequestInfoPage
        title={title || ''}
        repoName={repoName}
        owner={owner}
      />
      <PullRequestFileDiffs />
    </div>
  );
};

export { PullRequestSplittingPage };
