import React from 'react';
import styled from 'styled-components';
import { FileDiff } from '@web/design/components/FileDiff/FileDiff';
import { FileWithHunkBoundaries } from './calculateHunks';

interface PullRequestFileDiffsProps {
  PRDiff?: FileWithHunkBoundaries[];
}

const PR_SPLITTING_PAGE_DIFFS_SECTION_TESTID =
  'pr splitting page diffs sections';
const PR_SPLITTING_PAGE_FILE_DIFF_TESTID = 'pr splitting page file diff';
const PR_SPLITTING_PAGE_LOADING_TESTID = 'pr splitting page loading';

const FileDiffsSection = styled.div`
  min-width: 0;
  margin: 0 20px 0 0;
  flex-grow: 1;
`;

const FileDiffContainer = styled.div`
  margin: 0 0 20px 0;
`;

const PullRequestFileDiffs = ({
  PRDiff,
}: PullRequestFileDiffsProps): JSX.Element => {
  if (!PRDiff) {
    return <div data-testid={PR_SPLITTING_PAGE_LOADING_TESTID}>Loading...</div>;
  }
  return (
    <FileDiffsSection data-testid={PR_SPLITTING_PAGE_DIFFS_SECTION_TESTID}>
      {PRDiff.map(
        (fileDiff): JSX.Element => {
          return (
            <FileDiffContainer
              data-testid={PR_SPLITTING_PAGE_FILE_DIFF_TESTID}
              key={`${fileDiff.from} ${fileDiff.to}`}
            >
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

export {
  PullRequestFileDiffs,
  PR_SPLITTING_PAGE_FILE_DIFF_TESTID,
  PR_SPLITTING_PAGE_LOADING_TESTID,
  PR_SPLITTING_PAGE_DIFFS_SECTION_TESTID,
};
