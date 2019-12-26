import { Chunk, Change, File } from 'parse-diff';
import { last } from 'lodash';
import { assert } from '@web/lib/assert';
import { cloneDeep } from 'lodash';

interface HunkBoundary {
  isHunk: boolean;
  changes: Change[];
}

interface ChunkWithHunkBoundaries extends Chunk {
  hunkBoundaries: HunkBoundary[];
}

interface FileWithHunkBoundaries extends Omit<File, 'chunks'> {
  chunks: ChunkWithHunkBoundaries[];
}

const isNormalLine = (line: Change): boolean => {
  return line.type === 'normal';
};

const calculateChunkHunkBoundaries = (chunk: Chunk): HunkBoundary[] => {
  const hunks: HunkBoundary[] = [];
  let currentBoundary: HunkBoundary | undefined = undefined;

  chunk.changes.forEach((line): void => {
    if (currentBoundary === undefined) {
      // At start of hunk
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
      // If in same group as previous line in current hunk, then it belongs to current hunk
      currentBoundary.changes.push(line);
    } else {
      // If doesn't match the last change, then the current hunk is done
      hunks.push(currentBoundary);
      currentBoundary = {
        isHunk: !isNormalLine(line),
        changes: [line],
      };
    }
  });

  if (currentBoundary) {
    hunks.push(currentBoundary);
    currentBoundary = undefined;
  }

  return hunks;
};

const addHunkBoundariesToFileDiffs = (
  files: File[]
): FileWithHunkBoundaries[] => {
  const filesCpy = cloneDeep(files);

  const result = filesCpy.map(
    (file): FileWithHunkBoundaries => {
      return {
        ...file,
        chunks: file.chunks.map(
          (chunk): ChunkWithHunkBoundaries => {
            return {
              ...chunk,
              hunkBoundaries: calculateChunkHunkBoundaries(chunk),
            };
          }
        ),
      };
    }
  );

  return result;
};

export {
  addHunkBoundariesToFileDiffs,
  HunkBoundary,
  ChunkWithHunkBoundaries,
  FileWithHunkBoundaries,
};
