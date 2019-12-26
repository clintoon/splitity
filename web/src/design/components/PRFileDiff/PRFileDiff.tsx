import React from 'react';
import styled, { FlattenSimpleInterpolation, css } from 'styled-components';
import { Card } from '@web/design/components/Card/Card';
import { Color } from '@web/design/styles/color';
import { codeFontFamily } from '@web/design/styles/font';
import { Line } from '@web/design/components/PRFileDiff/internal/Line';
import { DiffChunk, FileDiffLineGroup } from '@web/lib/parseDiff/parseDiff';

interface FilenameChange {
  from?: string;
  to?: string;
}

type OnHunkClick = (lineGroupIndex: number) => void;

interface PRFileDiffProps {
  filename: FilenameChange;
  chunks: DiffChunk[];
  onHunkClick: OnHunkClick;
}

interface ChunkProps {
  chunk: DiffChunk;
  onHunkClick: OnHunkClick;
}

interface LineGroupProps {
  lineGroup: FileDiffLineGroup;
  onHunkClick: OnHunkClick;
  lineGroupIndex: number;
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

interface LineGroupContainerProps {
  isHunk: boolean;
}

const LineGroupContainer = styled.tbody<LineGroupContainerProps>`
  ${({ isHunk }): FlattenSimpleInterpolation | null => {
    if (!isHunk) {
      return null;
    }

    return css`
      cursor: pointer;
    `;
  }}
`;

const LineGroup = ({
  lineGroup,
  onHunkClick,
  lineGroupIndex,
}: LineGroupProps): JSX.Element => {
  const onHunkClickHandler = (): void => {
    onHunkClick(lineGroupIndex);
  };

  return (
    <LineGroupContainer
      isHunk={lineGroup.isHunk}
      onClick={lineGroup.isHunk ? onHunkClickHandler : undefined}
    >
      {lineGroup.changes.map(
        (change, index): JSX.Element => {
          return <Line key={index} change={change} />;
        }
      )}
    </LineGroupContainer>
  );
};

const Chunk = ({ chunk, onHunkClick }: ChunkProps): JSX.Element => {
  return (
    <React.Fragment>
      {chunk.lineGroups.map(
        (lineGroups, index): JSX.Element => {
          return (
            <LineGroup
              key={index}
              lineGroupIndex={index}
              lineGroup={lineGroups}
              onHunkClick={onHunkClick}
            />
          );
        }
      )}
    </React.Fragment>
  );
};

const ChunkSeparator = styled.tr`
  height: 30px;
  background-color: ${Color.Blue50};
`;

const PRFileDiff = ({
  filename,
  chunks,
  onHunkClick,
}: PRFileDiffProps): JSX.Element => {
  return (
    <Card header={getFilenameHeader(filename) || ''}>
      <Table>
        {chunks.map(
          (chunk, index): JSX.Element => {
            return (
              <React.Fragment key={chunk.content}>
                <Chunk chunk={chunk} onHunkClick={onHunkClick} />
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

export { PRFileDiff, FILE_DIFF_CHUNK_SEPARATOR_TESTID };
