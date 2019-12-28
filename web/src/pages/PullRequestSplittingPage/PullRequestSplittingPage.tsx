import React, { useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { GithubAPI } from '@web/lib/github/github';
import { PullRequestInfoPage } from '@web/pages/PullRequestSplittingPage/PullRequestInfo';
import styled from 'styled-components';
import { PullRequestControlPanel } from './PullRequestControlPanel';
import { PullRequestFileDiffs } from './PullRequestsFileDiffs';
import { generateRandomColor } from '@web/lib/randomColor/generateRandomColor';
import { filter, has, cloneDeep, keyBy, pickBy } from 'lodash';
import { parseDiff, FileDiff } from '@web/lib/parseDiff/parseDiff';
import { mapDataToFileDiff } from './mapDataToFileDiffs';

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

interface HunkInfo {
  prBranchId: number;
}

const useGetPRTitle = (
  owner: string,
  repoName: string,
  pullRequestId: number
): string | undefined => {
  const [title, setTitle] = useState<string | undefined>();

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
): FileDiff[] => {
  const [PRDiff, setPRDiff] = useState<FileDiff[]>([]);
  useEffect((): void => {
    const callback = async (): Promise<void> => {
      const githubApi = new GithubAPI();
      const diff = await githubApi.getPullRequestDiff({
        owner,
        repoName,
        pullRequestId,
      });

      const fileDiffs = parseDiff(diff);
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
  const [allocatedHunks, setAllocatedHunks] = useState<
    Record<string, HunkInfo>
  >({});

  const onDeletePRClickHandler = (prId: number): void => {
    const newPRBranchsData = {
      ...prBranchsData,
      prCollection: filter(prBranchsData.prCollection, (val): boolean => {
        return val.id !== prId;
      }),
    };
    setPRBranchsData(newPRBranchsData);
    if (selectedPRBranch === prId) {
      setSelectedPRBranch(null);
    }

    // Need to remove from allocated hunks with the pr id
    const filteredOutDeletedHunks = pickBy(allocatedHunks, (hunk): boolean => {
      return hunk.prBranchId !== prId;
    });

    setAllocatedHunks(filteredOutDeletedHunks);
  };

  const onAddPRClickHandler = (name: string): void => {
    const prColor = generateRandomColor();
    setPRBranchsData({
      count: prBranchsData.count + 1,
      prCollection: [
        ...prBranchsData.prCollection,
        { id: prBranchsData.count, name, color: prColor },
      ],
    });
  };

  const onSelectPRHandler = (prId: number): void => {
    if (prId === selectedPRBranch) {
      setSelectedPRBranch(null);
    } else {
      setSelectedPRBranch(prId);
    }
  };

  const onHunkClickHandler = (lineGroupId: string): void => {
    const allocatedHunksCpy = cloneDeep(allocatedHunks);
    const allocateHunksKey = lineGroupId;
    const isAllocated = has(allocatedHunks, allocateHunksKey);

    if (isAllocated && selectedPRBranch === null) {
      delete allocatedHunksCpy[allocateHunksKey];
      setAllocatedHunks(allocatedHunksCpy);
      return;
    }

    if (selectedPRBranch !== null) {
      allocatedHunksCpy[allocateHunksKey] = { prBranchId: selectedPRBranch };
      setAllocatedHunks(allocatedHunksCpy);
      return;
    }
  };

  const prCollectionDict = keyBy(prBranchsData.prCollection, 'id');

  return (
    <div>
      <PullRequestInfoPage
        title={title || ''}
        repoName={repoName}
        owner={owner}
      />
      <PRSplitSection>
        <PullRequestFileDiffs
          PRDiff={mapDataToFileDiff(PRDiff, allocatedHunks, (prId): string => {
            return prCollectionDict[prId].color;
          })}
          onHunkClick={onHunkClickHandler}
        />
        <PullRequestControlPanel
          prCollection={prBranchsData.prCollection}
          onAddPRClick={onAddPRClickHandler}
          onDeletePRClick={onDeletePRClickHandler}
          onSelectPR={onSelectPRHandler}
          selectedPRBranch={selectedPRBranch}
        />
      </PRSplitSection>
    </div>
  );
};

export { PullRequestSplittingPage, PRBranchData, HunkInfo };
