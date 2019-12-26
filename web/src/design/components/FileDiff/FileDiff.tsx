import React from 'react';
import styled from 'styled-components';
import { Card } from '@web/design/components/Card/Card';
import { Color } from '@web/design/styles/color';
import { codeFontFamily } from '@web/design/styles/font';
import { Line } from '@web/design/components/FileDiff/internal/Line';
import { DiffChunk, HunkBoundary } from '@web/lib/parseDiff/parseDiff';

interface FilenameChange {
  from?: string;
  to?: string;
}

interface FileDiffProps {
  filename: FilenameChange;
  chunks: DiffChunk[];
}

interface ChunkProps {
  chunk: DiffChunk;
}

const FILE_DIFF_CHUNK_SEPARATOR_TESTID = 'file diff chunk separator';

const getFilenameHeader = (filename: FilenameChange): string | undefined => {
  if (filename.from === filename.to) {
    return filename.from || filename.from;
  }

  if (!filename.from || !filename.to) {
    throw new Error('FileDiff: file path not specified');
  }

  return `${filename.from} → ${filename.to}`;
};

const Table = styled.table`
  padding: 0;
  margin: 0;
  width: 100%;
  border-spacing: 0;
  overflow-x: scroll;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  ${codeFontFamily};
  font-size: 12px;
`;

interface HunkBoundaryProps {
  hunkBoundary: HunkBoundary;
}

const HunkBoundary = ({ hunkBoundary }: HunkBoundaryProps): JSX.Element => {
  return (
    <tbody>
      {hunkBoundary.changes.map(
        (change, index): JSX.Element => {
          return <Line key={index} change={change} />;
        }
      )}
    </tbody>
  );
};

const Chunk = ({ chunk }: ChunkProps): JSX.Element => {
  return (
    <React.Fragment>
      {chunk.hunkBoundaries.map(
        (hunkBoundary, index): JSX.Element => {
          return <HunkBoundary key={index} hunkBoundary={hunkBoundary} />;
        }
      )}
    </React.Fragment>
  );
};

const ChunkSeparator = styled.tr`
  height: 30px;
  background-color: ${Color.Blue50};
`;

const FileDiff = ({ filename, chunks }: FileDiffProps): JSX.Element => {
  return (
    <Card header={getFilenameHeader(filename) || ''}>
      <Table>
        {chunks.map(
          (chunk, index): JSX.Element => {
            return (
              <React.Fragment key={chunk.content}>
                <Chunk chunk={chunk} />
                {index !== chunks.length - 1 && (
                  <tbody>
                    <ChunkSeparator
                      data-testid={FILE_DIFF_CHUNK_SEPARATOR_TESTID}
                    >
                      <td colSpan={3} />
                    </ChunkSeparator>
                  </tbody>
                )}
              </React.Fragment>
            );
          }
        )}
      </Table>
    </Card>
  );
};

export { FileDiff, FILE_DIFF_CHUNK_SEPARATOR_TESTID };
