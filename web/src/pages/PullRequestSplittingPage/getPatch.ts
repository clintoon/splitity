import { File, Chunk, Change } from 'parse-diff';
import { FileDiff, FileDiffLineGroup } from '@web/lib/parseDiff/parseDiff';
import { Diff, generateDiff } from '@web/lib/parseDiff/generateDiff';
import { HunkAllocations } from './PullRequestSplittingPage';
import { has, cloneDeep, countBy } from 'lodash';

type AllocatedHunksByPRId = Record<number, Set<string>>;

interface ConvertLineGroupsToChunksResult {
  chunks: Chunk[];
  totalAdditions: number;
  totalDeletions: number;
  updatedFileOffset: number;
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

interface GetLineGroupLineCountsResult {
  numAdditions: number;
  numDeletions: number;
  numNormal: number;
}

const getLineGroupLineCounts = (
  lineGroup: FileDiffLineGroup
): GetLineGroupLineCountsResult => {
  // Filter out when it isn't a line
  // e.g. \ No newline at end of file
  const changes = lineGroup.changes.filter((line: Change): boolean => {
    const contentType = line.content.charAt(0);
    return contentType === ' ' || contentType === '-' || contentType === '+';
  });

  const countsByType = countBy(changes, (change): string => {
    return change.type;
  });

  const numAdditions = countsByType['add'] ?? 0;
  const numDeletions = countsByType['del'] ?? 0;
  const numNormal = countsByType['normal'] ?? 0;

  return {
    numAdditions,
    numDeletions,
    numNormal,
  };
};

const convertLineGroupsToChunks = (
  fileDiff: FileDiff,
  fileIndex: number,
  lineGroupIds: Set<string>,
  fileOffset: number
): ConvertLineGroupsToChunksResult => {
  const newChunks: Chunk[] = [];
  let totalAdditions = 0;
  let totalDeletions = 0;

  let currentFileOffset = fileOffset;

  fileDiff.chunks.forEach((chunk, chunkIndex): void => {
    let oldStartChunkPos = chunk.oldStart;
    let newStartChunkPos = chunk.newStart;

    chunk.lineGroups.forEach((lineGroup, lineGroupIndex): void => {
      const lineGroupId = `${fileIndex} ${chunkIndex} ${lineGroupIndex}`;
      const toAddLineGroup = lineGroupIds.has(lineGroupId);
      const { changes } = lineGroup;

      const { numAdditions, numDeletions, numNormal } = getLineGroupLineCounts(
        lineGroup
      );

      const oldStart = oldStartChunkPos + currentFileOffset;
      const oldLines = numDeletions + numNormal;
      const newStart = newStartChunkPos + currentFileOffset;
      const newLines = numAdditions + numNormal;

      const newChunk = {
        content: `@@ -${oldStart},${oldLines} +${newStart},${newLines} @@`,
        changes,
        oldStart,
        oldLines,
        newStart,
        newLines,
      };

      if (toAddLineGroup) {
        totalAdditions += newLines;
        totalDeletions += oldLines;

        oldStartChunkPos += newLines;
        newStartChunkPos += newLines;

        newChunks.push(newChunk);
      } else {
        oldStartChunkPos += oldLines;
        newStartChunkPos += oldLines;

        // If you don't add to this diff, then you should need to offset the changes
        // not being made
        currentFileOffset = currentFileOffset + numDeletions - numAdditions;
      }
    });
  });

  return {
    chunks: newChunks,
    totalAdditions,
    totalDeletions,
    updatedFileOffset: currentFileOffset,
  };
};

const isValidFileDiff = (file: File): boolean => {
  // if file has no changes then it is invalid
  return !(file.chunks.length === 0);
};

const getDiff = (filesDiff: FileDiff[], lineGroupIds: Set<string>): Diff => {
  const filesDiffCpy = cloneDeep(filesDiff);
  let fileOffSet = 0;

  const files = filesDiffCpy.map(
    (fileDiff, fileIndex): File => {
      const {
        chunks,
        totalAdditions,
        totalDeletions,
        updatedFileOffset,
      } = convertLineGroupsToChunks(
        fileDiff,
        fileIndex,
        lineGroupIds,
        fileOffSet
      );

      fileOffSet = updatedFileOffset;

      return {
        ...fileDiff,
        chunks,
        deletions: totalDeletions,
        additions: totalAdditions,
      };
    }
  );

  const validFiles = files.filter(isValidFileDiff);
  return validFiles;
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

// TODO(clinton): Write unit tests. Edge cases to test: rename, delete, add files
const fileDiffsToPatches = (
  filesDiff: FileDiff[],
  allocatedHunks: HunkAllocations
): string[] => {
  const diffResult = transformToVanillaFileDiffsByPRs(
    filesDiff,
    allocatedHunks
  );

  const patches = diffResult.map((diff): string => {
    return generateDiff(diff);
  });

  return patches;
};

export { transformToVanillaFileDiffsByPRs, fileDiffsToPatches };
