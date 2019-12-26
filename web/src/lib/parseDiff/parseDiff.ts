import parse, { Change, Chunk, File } from 'parse-diff';
import { addHunkBoundariesToFileDiffs } from './internal/calculateHunks';

interface HunkBoundary {
  isHunk: boolean;
  changes: Change[];
}

interface DiffChunk extends Chunk {
  hunkBoundaries: HunkBoundary[];
}

interface FileDiff extends Omit<File, 'chunks'> {
  chunks: DiffChunk[];
}

const parseDiff = (diff: string): FileDiff[] => {
  const res = parse(diff);

  return addHunkBoundariesToFileDiffs(res);
};

export { parseDiff, HunkBoundary, DiffChunk, FileDiff };
