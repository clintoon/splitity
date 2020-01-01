import parse, { Change, Chunk, File } from 'parse-diff';
import { addLineGroupsToFileDiffs } from './internal/calculateHunks';

interface LineGroupRange {
  start: number;
  numLines: number;
}

interface FileDiffLineGroup {
  isHunk: boolean;
  changes: Change[];
  oldRange: LineGroupRange;
  newRange: LineGroupRange;
}

interface DiffChunk extends Chunk {
  lineGroups: FileDiffLineGroup[];
}

interface FileDiff extends Omit<File, 'chunks'> {
  chunks: DiffChunk[];
}

const parseDiff = (diff: string): FileDiff[] => {
  const res = parse(diff);

  return addLineGroupsToFileDiffs(res);
};

export { parseDiff, FileDiffLineGroup, DiffChunk, FileDiff };
