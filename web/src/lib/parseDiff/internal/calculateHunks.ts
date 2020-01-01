import { Chunk, Change, File, NormalChange } from 'parse-diff';
import { last } from 'lodash';
import { assert } from '@web/lib/assert';
import { cloneDeep, countBy } from 'lodash';
import { FileDiffLineGroup, FileDiff, DiffChunk } from '../parseDiff';

const isNormalLine = (line: Change): boolean => {
  return line.type === 'normal';
};

interface PartialLineGroup {
  isHunk: boolean;
  changes: Change[];
}

const fillRangeInfo = (
  lineGroup: PartialLineGroup,
  oldStart: number,
  newStart: number
): FileDiffLineGroup => {
  const countsByType = countBy(lineGroup.changes, (change): string => {
    return change.type;
  });

  const numAdditions = countsByType['add'] ?? 0;
  const numDeletions = countsByType['del'] ?? 0;
  const numNormal = countsByType['normal'] ?? 0;

  return {
    ...lineGroup,
    oldRange: {
      start: oldStart,
      numLines: numDeletions + numNormal,
    },
    newRange: {
      start: newStart,
      numLines: numAdditions + numNormal,
    },
  };
};

const calculateHunks = (chunk: Chunk): FileDiffLineGroup[] => {
  const lineGroups: FileDiffLineGroup[] = [];
  let currentBoundary: PartialLineGroup | undefined = undefined;

  let newStart = chunk.newStart;
  let oldStart = chunk.oldStart;

  chunk.changes.forEach((line): void => {
    if (currentBoundary === undefined) {
      // At start of lineGroups
      currentBoundary = {
        isHunk: !isNormalLine(line),
        changes: [line],
      };
      return;
    }

    const currentBoundaryLastLine = last(currentBoundary.changes);
    assert(
      currentBoundaryLastLine !== undefined,
      'currentHunkLastLine expected to be defined'
    );

    if (isNormalLine(currentBoundaryLastLine) === isNormalLine(line)) {
      // If in same group as previous line in current lineGroup, then it belongs to current lineGroup
      currentBoundary.changes.push(line);
    } else {
      // If doesn't match the last change, then the current lineGroup is done
      const toAddLineGroup = fillRangeInfo(currentBoundary, newStart, oldStart);
      lineGroups.push(toAddLineGroup);

      // Need to update the counters
      newStart += toAddLineGroup.newRange.numLines;
      oldStart += toAddLineGroup.oldRange.numLines;

      // Start the boundary
      currentBoundary = {
        isHunk: !isNormalLine(line),
        changes: [line],
      };
    }
  });

  if (currentBoundary) {
    lineGroups.push(fillRangeInfo(currentBoundary, newStart, oldStart));
    currentBoundary = undefined;
  }

  return lineGroups;
};

const addLineGroupsToFileDiffs = (files: File[]): FileDiff[] => {
  const filesCpy = cloneDeep(files);

  const result = filesCpy.map(
    (file): FileDiff => {
      return {
        ...file,
        chunks: file.chunks.map(
          (chunk): DiffChunk => {
            return {
              ...chunk,
              lineGroups: calculateHunks(chunk),
            };
          }
        ),
      };
    }
  );

  return result;
};

export { addLineGroupsToFileDiffs };
