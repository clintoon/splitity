import { FileDiff, DiffChunk } from '@web/lib/parseDiff/parseDiff';
import { cloneDeep, has } from 'lodash';
import { HunkInfo } from './PullRequestSplittingPage';
import { PRFileDiffLineGroup } from '@web/design/components/PRFileDiff/PRFileDiff';

const mapDataToFileDiff = (
  fileDiffs: FileDiff[],
  allocatedHunks: Record<string, HunkInfo>,
  getColor: (prId: number) => string
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

                  if (!isAllocated) {
                    return lineGroup;
                  }

                  return {
                    ...lineGroup,
                    color: getColor(allocatedHunks[lineGroupId].prBranchId),
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
