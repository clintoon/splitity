import { File, Chunk } from 'parse-diff';
import { assert } from '../assert';

type Diff = File[];

const getFileInfoSection = (file: File): string => {
  const { from, to, index, deleted, new: isNewFile } = file;

  assert(from !== undefined);
  assert(to !== undefined);
  assert(index !== undefined);

  const renamed = to !== from && !deleted && !isNewFile;

  let cmdOriginalPath: string;
  let cmdNewPath: string;
  let originalPath: string;
  let newPath: string;

  if (deleted) {
    cmdOriginalPath = `a/${from}`;
    cmdNewPath = `b/${from}`;
    originalPath = `a/${from}`;
    newPath = to;
  } else if (isNewFile) {
    cmdOriginalPath = `a/${to}`;
    cmdNewPath = `b/${to}`;
    originalPath = from;
    newPath = `b/${to}`;
  } else {
    cmdOriginalPath = `a/${from}`;
    cmdNewPath = `b/${to}`;
    originalPath = `a/${from}`;
    newPath = `b/${to}`;
  }

  const cmdSection = `diff --git ${cmdOriginalPath} ${cmdNewPath}`;

  const deleteSection = deleted ? 'deleted file mode 100644' : null;

  const addSection = isNewFile ? 'new file mode 100644' : null;

  const renameSection = renamed
    ? `rename from ${originalPath}
rename to ${newPath}`
    : null;

  const contentSection = `index ${index.join(' ')}
--- ${originalPath}
+++ ${newPath}`;

  return [cmdSection, deleteSection, addSection, renameSection, contentSection]
    .filter((section): boolean => section !== null)
    .join('\n');
};

const getFileChunkSection = (chunk: Chunk): string => {
  const changes = chunk.changes.map((change): string => {
    return change.content;
  });

  return `${chunk.content}
${changes.join('\n')}`;
};

const getFile = (file: File): string => {
  const changes = file.chunks.map((chunk): string => {
    return getFileChunkSection(chunk);
  });

  return [getFileInfoSection(file), ...changes].join('\n');
};

const generateDiff = (diff: Diff): string => {
  return diff
    .map((file): string => {
      return getFile(file);
    })
    .join('\n');
};

export { generateDiff, Diff };
