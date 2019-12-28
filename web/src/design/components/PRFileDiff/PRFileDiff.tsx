import React from 'react';
import styled, { FlattenSimpleInterpolation, css } from 'styled-components';
import { Card } from '@web/design/components/Card/Card';
import { Color } from '@web/design/styles/color';
import { codeFontFamily } from '@web/design/styles/font';
import { Line } from '@web/design/components/PRFileDiff/internal/Line';
import { DiffChunk, FileDiffLineGroup } from '@web/lib/parseDiff/parseDiff';

const NORMAL_LINEGROUP_TEST_ID = 'pr-file-diff-not-hunk-normal-linegroup';
const NOT_ALLOCED_HUNK_TEST_ID = 'pr-file-diff-hunk-linegroup';
const ALLOCED_HUNK_TEST_ID = 'pr-file-diff-alloc-color-set-linegroup';

interface FilenameChange {
  from?: string;
  to?: string;
}

type OnHunkClick = (lineGroupId: string) => void;

interface PRFileDiffProps {
  filename: FilenameChange;
  chunks: DiffChunk[];
  onHunkClick: OnHunkClick;
  fileDiffId: string;
}

interface ChunkProps {
  chunk: DiffChunk;
  onHunkClick: OnHunkClick;
  chunkId: string;
}

type PRFileDiffLineGroup = FileDiffLineGroup & {
  color?: string;
};

interface LineGroupProps {
  lineGroup: PRFileDiffLineGroup;
  onHunkClick: OnHunkClick;
  lineGroupId: string;
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
  hunkColor?: string;
  disabled: boolean;
}

const LineGroupContainer = styled.tbody<LineGroupContainerProps>`
  display: block;

  ${({ hunkColor }): FlattenSimpleInterpolation => {
    return css`
      border-left: 4px solid ${hunkColor || Color.Gray300};
    `;
  }};

  ${({ isHunk, disabled }): FlattenSimpleInterpolation | null => {
    if (!isHunk || disabled) {
      return null;
    }

    return css`
      cursor: pointer;
    `;
  }}
`;

const ChunkSeparatorContainer = styled.tbody`
  display: table;
  width: 100%;
`;

const LineGroup = ({
  lineGroup,
  onHunkClick,
  lineGroupId,
}: LineGroupProps): JSX.Element => {
  let lineGroupTypeTestId: string;
  if (lineGroup.isHunk) {
    lineGroupTypeTestId = lineGroup.color
      ? ALLOCED_HUNK_TEST_ID
      : NOT_ALLOCED_HUNK_TEST_ID;
  } else {
    lineGroupTypeTestId = NORMAL_LINEGROUP_TEST_ID;
  }

  return (
    <LineGroupContainer
      data-testid={lineGroupTypeTestId}
      disabled={!onHunkClick}
      hunkColor={lineGroup.color}
      isHunk={lineGroup.isHunk}
      onClick={
        lineGroup.isHunk
          ? (): void => {
              onHunkClick(lineGroupId);
            }
          : undefined
      }
    >
      {lineGroup.changes.map(
        (change, index): JSX.Element => {
          return <Line key={index} change={change} />;
        }
      )}
    </LineGroupContainer>
  );
};

const Chunk = ({ chunk, onHunkClick, chunkId }: ChunkProps): JSX.Element => {
  return (
    <React.Fragment>
      {chunk.lineGroups.map(
        (lineGroup, lineGroupIndex): JSX.Element => {
          return (
            <LineGroup
              key={lineGroupIndex}
              lineGroupId={`${chunkId} ${lineGroupIndex}`}
              lineGroup={lineGroup}
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
  fileDiffId,
}: PRFileDiffProps): JSX.Element => {
  return (
    <Card header={getFilenameHeader(filename) || ''}>
      <Table>
        {chunks.map(
          (chunk, chunkIndex): JSX.Element => {
            return (
              <React.Fragment key={chunk.content}>
                <Chunk
                  chunk={chunk}
                  onHunkClick={onHunkClick}
                  chunkId={`${fileDiffId} ${chunkIndex}`}
                />
                {chunkIndex !== chunks.length - 1 && (
                  <ChunkSeparatorContainer>
                    <ChunkSeparator
                      data-testid={FILE_DIFF_CHUNK_SEPARATOR_TESTID}
                    >
                      <td />
                    </ChunkSeparator>
                  </ChunkSeparatorContainer>
                )}
              </React.Fragment>
            );
          }
        )}
      </Table>
    </Card>
  );
};

export {
  PRFileDiff,
  FILE_DIFF_CHUNK_SEPARATOR_TESTID,
  PRFileDiffLineGroup,
  NOT_ALLOCED_HUNK_TEST_ID,
  ALLOCED_HUNK_TEST_ID,
  NORMAL_LINEGROUP_TEST_ID,
};
