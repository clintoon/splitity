import parse, { Change, Chunk, File } from 'parse-diff';
import { addLineGroupsToFileDiffs } from './internal/calculateHunks';

interface FileDiffLineGroup {
  isHunk: boolean;
  changes: Change[];
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
