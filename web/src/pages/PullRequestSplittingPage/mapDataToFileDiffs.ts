import {
  FileDiff,
  DiffChunk,
  FileDiffLineGroup,
} from '@web/lib/parseDiff/parseDiff';
import { cloneDeep, has } from 'lodash';
import { HunkInfo } from './PullRequestSplittingPage';

const mapDataToFileDiff = (
  fileDiffs: FileDiff[],
  getAdditionalData: (lineGroupId: string) => object
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
                (lineGroup, lineGroupIndex): FileDiffLineGroup => {
                  const lineGroupId = `${fileDiffIndex} ${chunkIndex} ${lineGroupIndex}`;

                  return {
                    ...lineGroup,
                    ...getAdditionalData(lineGroupId),
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

// TODO(clinton): Write unit tests for this...
const mapPropDataToFileDiff = (
  fileDiffs: FileDiff[],
  allocatedHunks: Record<string, HunkInfo>,
  getColor: (prId: number) => string,
  selectedPrBranch: number | null
): FileDiff[] => {
  return mapDataToFileDiff(fileDiffs, (lineGroupId): object => {
    const isAllocated = has(allocatedHunks, lineGroupId);

    return {
      color: isAllocated
        ? getColor(allocatedHunks[lineGroupId].prBranchId)
        : undefined,
      clickDisabled: !isAllocated && selectedPrBranch === null,
    };
  });
};

// TODO(clinton): Write unit tests for this...
const mapPrIdsToFileDiff = (
  fileDiffs: FileDiff[],
  allocatedHunks: Record<string, HunkInfo>
): FileDiff[] => {
  return mapDataToFileDiff(fileDiffs, (lineGroupId): object => {
    const isAllocated = has(allocatedHunks, lineGroupId);

    return {
      prBranchId: isAllocated
        ? allocatedHunks[lineGroupId].prBranchId
        : undefined,
    };
  });
};

export { mapPropDataToFileDiff, mapPrIdsToFileDiff };
