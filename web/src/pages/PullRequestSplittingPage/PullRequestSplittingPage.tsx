import React, { useEffect, useState } from 'react';
import { match as routerMatch } from 'react-router-dom';
import { PullRequestInfoPage } from '@web/pages/PullRequestSplittingPage/PullRequestInfo';
import styled from 'styled-components';
import { PullRequestControlPanel } from './PullRequestControlPanel';
import { PullRequestFileDiffs } from './PullRequestsFileDiffs';
import { generateRandomColor } from '@web/lib/randomColor/generateRandomColor';
import { filter, has, cloneDeep, keyBy, pickBy, size } from 'lodash';
import { parseDiff, FileDiff } from '@web/lib/parseDiff/parseDiff';
import { mapPropDataToFileDiff } from './mapDataToFileDiffs';
import { BackendAPI } from '@web/lib/backend/backendApi';
import { logger } from '@web/lib/logger';
import { showAlert } from '@web/lib/alert/alert';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { GithubRoutePath } from '@web/constants/routes';
import { fileDiffsToPatches } from './getPatch';
import { track } from '@web/lib/analytics/tracking';
import { TrackingEvent } from '@web/lib/analytics/events';

const PULL_REQUEST_SPLITTING_PAGE_TESTID = 'pull request splitting page';

interface MatchProps {
  owner: string;
  repoName: string;
  pullRequestId: string;
}

interface PullRequestSplittingPageProps {
  match: routerMatch<MatchProps>;
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

type HunkAllocations = Record<string, HunkInfo>;

const useCallPageLoadTracking = (): void => {
  useEffect((): void => {
    track(TrackingEvent.onLoadSplitPRPage);
  });
};

// const useGetPRTitle = (
//   owner: string,
//   repoName: string,
//   pullRequestId: number
// ): string | undefined => {
//   const [title, setTitle] = useState<string | undefined>();

//   useEffect((): void => {
//     const callback = async (): Promise<void> => {
//       const githubApi = new GithubAPI();
//       const res = await githubApi.getPullRequestInfo({
//         owner,
//         repoName,
//         pullRequestId: Number(pullRequestId),
//       });

//       if (res) {
//         setTitle(res.title);
//       }
//     };
//     callback();
//   }, []);
//   return title;
// };

// const useGetPRDiff = (
//   owner: string,
//   repoName: string,
//   pullRequestId: number
// ): FileDiff[] | undefined => {
//   const [PRDiff, setPRDiff] = useState<FileDiff[]>();
//   useEffect((): void => {
//     const callback = async (): Promise<void> => {
//       const githubApi = new GithubAPI();
//       const diff = await githubApi.getPullRequestDiff({
//         owner,
//         repoName,
//         pullRequestId,
//       });

//       const fileDiffs = parseDiff(diff);
//       setPRDiff(fileDiffs);
//     };
//     callback();
//   }, []);

//   return PRDiff;
// };

interface FetchPRData {
  title: string;
  diff: FileDiff[];
}

interface UseFetchPRDataOptions {
  owner: string;
  repoName: string;
  pullRequestId: number;
}

const useFetchPRData = (
  options: UseFetchPRDataOptions
): FetchPRData | undefined => {
  const [prData, setPRData] = useState();

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const backend = new BackendAPI();
      const { title, diff } = await backend.getPullRequestDiff(options);
      setPRData({
        title,
        diff: parseDiff(diff),
      });
    };

    fetchData();
  }, []);

  return prData;
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
  useCallPageLoadTracking();

  const { owner, repoName, pullRequestId } = match.params;
  const prData = useFetchPRData({
    owner: owner,
    repoName: repoName,
    pullRequestId: Number(pullRequestId),
  });
  const PRDiff = prData?.diff;
  const title = prData?.title;

  const history: History = useHistory();

  const [prBranchsData, setPRBranchsData] = useState<PRBranchsData>({
    count: 0,
    prCollection: [],
  });
  const [selectedPRBranch, setSelectedPRBranch] = useState<number | null>(null);
  const [allocatedHunks, setAllocatedHunks] = useState<HunkAllocations>({});

  const prCollectionDict = keyBy(prBranchsData.prCollection, 'id');

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

  const onSplitPR = async (): Promise<void> => {
    if (size(allocatedHunks) === 0) {
      showAlert(
        'You must allocate at least one hunk to an PR before you can split the PR.'
      );
      return;
    }

    if (PRDiff) {
      try {
        const backendApi = new BackendAPI();
        const patches = fileDiffsToPatches(PRDiff, allocatedHunks);
        await backendApi.splitPullRequest({
          owner,
          repoName,
          pullRequestId: Number(pullRequestId),
          patches,
        });
        track(TrackingEvent.onSplitPRSuccess);
        history.push(GithubRoutePath.AppRoot);
        showAlert(
          'An job to split the PR was added to the queue. Please wait for the pull requests to be created in the github repo.'
        );
      } catch (error) {
        logger.info(`Unable to split PR ${error}`);
        showAlert('Unable to split PR. Please try again.');
      }
    }
  };

  return (
    <div data-testid={PULL_REQUEST_SPLITTING_PAGE_TESTID}>
      <PullRequestInfoPage
        title={title || ''}
        repoName={repoName}
        owner={owner}
      />
      <PRSplitSection>
        <PullRequestFileDiffs
          PRDiff={
            PRDiff
              ? mapPropDataToFileDiff(
                  PRDiff,
                  allocatedHunks,
                  (prId): string => {
                    return prCollectionDict[prId].color;
                  },
                  selectedPRBranch
                )
              : undefined
          }
          onHunkClick={onHunkClickHandler}
        />
        <PullRequestControlPanel
          prCollection={prBranchsData.prCollection}
          onAddPRClick={onAddPRClickHandler}
          onDeletePRClick={onDeletePRClickHandler}
          onSelectPR={onSelectPRHandler}
          selectedPRBranch={selectedPRBranch}
          onSplitPR={onSplitPR}
        />
      </PRSplitSection>
    </div>
  );
};

export {
  PullRequestSplittingPage,
  PRBranchData,
  HunkInfo,
  HunkAllocations,
  PULL_REQUEST_SPLITTING_PAGE_TESTID,
};
