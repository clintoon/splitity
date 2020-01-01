import { File, Chunk } from 'parse-diff';
import { FileDiff } from '@web/lib/parseDiff/parseDiff';
import { Diff, generateDiff } from '@web/lib/parseDiff/generateDiff';
import { HunkAllocations } from './PullRequestSplittingPage';
import { has, cloneDeep } from 'lodash';

type AllocatedHunksByPRId = Record<number, Set<string>>;

interface ConvertLineGroupsToChunksResult {
  chunks: Chunk[];
  totalAdditions: number;
  totalDeletions: number;
}

const keyAllocatedHunkByPRId = (
  allocatedHunks: HunkAllocations
): AllocatedHunksByPRId => {
  const dict: AllocatedHunksByPRId = {};

  Object.keys(allocatedHunks).forEach((lineGroupId: string): void => {
    const prBranchId = allocatedHunks[lineGroupId].prBranchId;

    if (!has(dict, prBranchId)) {
      dict[prBranchId] = new Set();
    }
    dict[prBranchId].add(lineGroupId);
  });

  return dict;
};

const convertLineGroupsToChunks = (
  fileDiff: FileDiff,
  fileIndex: number,
  lineGroupIds: Set<string>
): ConvertLineGroupsToChunksResult => {
  const newChunks: Chunk[] = [];
  let totalAdditions = 0;
  let totalDeletions = 0;

  fileDiff.chunks.forEach((chunk, chunkIndex): void => {
    chunk.lineGroups.forEach((lineGroup, lineGroupIndex): void => {
      const lineGroupId = `${fileIndex} ${chunkIndex} ${lineGroupIndex}`;
      if (!lineGroupIds.has(lineGroupId)) {
        return;
      }

      const { changes, oldRange, newRange } = lineGroup;

      const oldStart = oldRange.start;
      const oldLines = oldRange.numLines;
      const newStart = newRange.start;
      const newLines = newRange.numLines;

      totalAdditions += newLines;
      totalDeletions += oldLines;

      const newChunk = {
        content: `@@ -${oldStart},${oldLines} +${newStart},${newLines} @@`,
        changes,
        oldStart,
        oldLines,
        newStart,
        newLines,
      };
      newChunks.push(newChunk);
    });
  });

  return {
    chunks: newChunks,
    totalAdditions,
    totalDeletions,
  };
};

const getDiff = (filesDiff: FileDiff[], lineGroupIds: Set<string>): Diff => {
  const filesDiffCpy = cloneDeep(filesDiff);
  return filesDiffCpy.map(
    (fileDiff, fileIndex): File => {
      const {
        chunks,
        totalAdditions,
        totalDeletions,
      } = convertLineGroupsToChunks(fileDiff, fileIndex, lineGroupIds);

      return {
        ...fileDiff,
        chunks,
        deletions: totalDeletions,
        additions: totalAdditions,
      };
    }
  );
};

const transformToVanillaFileDiffsByPRs = (
  filesDiff: FileDiff[],
  allocatedHunks: HunkAllocations
): Diff[] => {
  const diffs: Diff[] = [];

  const allocatedHunksByPRId = keyAllocatedHunkByPRId(allocatedHunks);
  for (const branchPRId in allocatedHunksByPRId) {
    const hunks = allocatedHunksByPRId[branchPRId];
    diffs.push(getDiff(filesDiff, hunks));
  }

  return diffs;
};

const fileDiffsToPatches = (
  filesDiff: FileDiff[],
  allocatedHunks: HunkAllocations
): string[] => {
  const diffResult = transformToVanillaFileDiffsByPRs(
    filesDiff,
    allocatedHunks
  );
  console.log(diffResult); // TODO(clinton): remove console.log
  return diffResult.map((diff): string => {
    return generateDiff(diff);
  });
};

export { transformToVanillaFileDiffsByPRs, fileDiffsToPatches };
