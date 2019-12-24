import React, { useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { GithubAPI } from '@web/lib/github/github';
import { PullRequestInfoPage } from '@web/pages/PullRequestSplittingPage/PullRequestInfo';
import parseDiff from 'parse-diff';
import styled from 'styled-components';
import { PullRequestControlPanel } from './PullRequestControlPanel';
import { PullRequestFileDiffs } from './PullRequestsFileDiffs';
import { generateRandomColor } from '@web/lib/randomColor/generateRandomColor';
import { filter } from 'lodash';

interface MatchProps {
  owner: string;
  repoName: string;
  pullRequestId: string;
}

interface PullRequestSplittingPageProps {
  match: match<MatchProps>;
}

interface PRBranchData {
  id: number;
  name: string;
  color: string;
}

interface PRBranchsData {
  count: number;
  prCollection: PRBranchData[];
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

const PRSplitSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  margin: 30px;
`;

const PullRequestSplittingPage = ({
  match,
}: PullRequestSplittingPageProps): JSX.Element => {
  const { owner, repoName, pullRequestId } = match.params;
  const title = useGetPRTitle(owner, repoName, Number(pullRequestId));
  const PRDiff = useGetPRDiff(owner, repoName, Number(pullRequestId));

  const [prBranchsData, setPRBranchsData] = useState<PRBranchsData>({
    count: 0,
    prCollection: [],
  });
  const [selectedPRBranch, setSelectedPRBranch] = useState<number | null>(null);

  return (
    <div>
      <PullRequestInfoPage
        title={title || ''}
        repoName={repoName}
        owner={owner}
      />
      <PRSplitSection>
        <PullRequestFileDiffs PRDiff={PRDiff} />
        <PullRequestControlPanel
          prCollection={prBranchsData.prCollection}
          onAddPRClick={(name): void => {
            const prColor = generateRandomColor();
            setPRBranchsData({
              count: prBranchsData.count + 1,
              prCollection: [
                ...prBranchsData.prCollection,
                { id: prBranchsData.count, name, color: prColor },
              ],
            });
          }}
          onDeletePRClick={(prId): void => {
            const newPRBranchsData = {
              ...prBranchsData,
              prCollection: filter(
                prBranchsData.prCollection,
                (val): boolean => {
                  return val.id !== prId;
                }
              ),
            };
            setPRBranchsData(newPRBranchsData);
            if (selectedPRBranch === prId) {
              setSelectedPRBranch(null);
            }
          }}
          onSelectPR={(prId): void => {
            if (prId === selectedPRBranch) {
              setSelectedPRBranch(null);
            } else {
              setSelectedPRBranch(prId);
            }
          }}
          selectedPRBranch={selectedPRBranch}
        />
      </PRSplitSection>
    </div>
  );
};

export { PullRequestSplittingPage, PRBranchData };
