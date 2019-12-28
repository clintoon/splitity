import { FileDiff, DiffChunk } from '@web/lib/parseDiff/parseDiff';
import { cloneDeep, has } from 'lodash';
import { HunkInfo } from './PullRequestSplittingPage';
import { PRFileDiffLineGroup } from '@web/design/components/PRFileDiff/PRFileDiff';

// TODO(clinton): Write unit tests for this when you decouple logic here
const mapDataToFileDiff = (
  fileDiffs: FileDiff[],
  allocatedHunks: Record<string, HunkInfo>,
  getColor: (prId: number) => string,
  selectedPrBranch: number | null
): FileDiff[] => {
  const fileDiffsCpy = cloneDeep(fileDiffs);

  return fileDiffsCpy.map(
    (fileDiff, fileDiffIndex): FileDiff => {
      return {
        ...fileDiff,
        chunks: fileDiff.chunks.map(
          (chunk, chunkIndex): DiffChunk => {
            return {
              ...chunk,
              lineGroups: chunk.lineGroups.map(
                (lineGroup, lineGroupIndex): PRFileDiffLineGroup => {
                  const lineGroupId = `${fileDiffIndex} ${chunkIndex} ${lineGroupIndex}`;
                  const isAllocated = has(allocatedHunks, lineGroupId);

                  return {
                    ...lineGroup,
                    color: isAllocated
                      ? getColor(allocatedHunks[lineGroupId].prBranchId)
                      : undefined,
                    clickDisabled: !isAllocated && selectedPrBranch === null,
                  };
                }
              ),
            };
          }
        ),
      };
    }
  );
};

export { mapDataToFileDiff };
