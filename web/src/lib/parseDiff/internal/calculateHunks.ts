import { Chunk, Change, File } from 'parse-diff';
import { last } from 'lodash';
import { assert } from '@web/lib/assert';
import { cloneDeep } from 'lodash';
import { FileDiffLineGroup, FileDiff, DiffChunk } from '../parseDiff';

const isNormalLine = (line: Change): boolean => {
  return line.type === 'normal';
};

const calculateHunks = (chunk: Chunk): FileDiffLineGroup[] => {
  const lineGroups: FileDiffLineGroup[] = [];
  let currentBoundary: FileDiffLineGroup | undefined = undefined;

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
      lineGroups.push(currentBoundary);

      // Start the boundary
      currentBoundary = {
        isHunk: !isNormalLine(line),
        changes: [line],
      };
    }
  });

  if (currentBoundary) {
    lineGroups.push(currentBoundary);
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
