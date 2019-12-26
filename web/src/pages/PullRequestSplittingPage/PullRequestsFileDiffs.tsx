import React from 'react';
import styled from 'styled-components';
import { PRFileDiff } from '@web/design/components/PRFileDiff/PRFileDiff';
import { FileDiff } from '@web/lib/parseDiff/parseDiff';
import { noop } from 'lodash';

interface PullRequestFileDiffsProps {
  PRDiff?: FileDiff[];
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
              <PRFileDiff
                filename={{ from: fileDiff.from, to: fileDiff.to }}
                chunks={fileDiff.chunks}
                onHunkClick={noop}
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
