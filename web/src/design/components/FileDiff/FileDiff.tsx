import React from 'react';
import styled, {
  FlattenInterpolation,
  css,
  FlattenSimpleInterpolation,
} from 'styled-components';
import { Card } from '@web/design/components/Card/Card';
import parseDiff from 'parse-diff';
import { Color } from '@web/design/styles/color';
import { codeFontFamily } from '@web/design/styles/font';

interface FilenameChange {
  from: string;
  to?: string;
}

interface FileDiffProps {
  filename: FilenameChange;
  chunks: parseDiff.Chunk[];
}

interface ChunkProps {
  chunk: parseDiff.Chunk;
}

interface LineProps {
  change: parseDiff.Change;
}

const getFilenameHeader = (filename: FilenameChange): string => {
  if (!filename.to || filename.from === filename.to) {
    return filename.from;
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
`;

const TableRow = styled.tr`
  padding: 0;
  margin: 0;
  width: 100%;
`;

interface TableDataProps {
  backgroundColor?: string;
}

const LineNumber = styled.td<TableDataProps>`
  margin: 0;
  padding: 0 8px;
  ${({ backgroundColor }): FlattenSimpleInterpolation | null => {
    return backgroundColor
      ? css`
          background-color: ${backgroundColor};
        `
      : null;
  }}
`;

const FullWidthTableData = styled.td`
  padding: 0;
  margin: 0;
  width: 100%;
`;

interface LineCodeProps {
  backgroundColor: string;
}

const LineCode = styled.div<LineCodeProps>`
  line-height: 24px;
  white-space: pre;
  background-color: ${({ backgroundColor }): string => backgroundColor};
`;

interface LineNumbersSection {
  backgroundColor: string;
  rightNumber: number | null;
  leftNumber: number | null;
}

const LineNumbersSection = ({
  backgroundColor,
  rightNumber,
  leftNumber,
}: LineNumbersSection): JSX.Element => {
  return (
    <>
      <LineNumber backgroundColor={backgroundColor}>{rightNumber}</LineNumber>
      <LineNumber backgroundColor={backgroundColor}>{leftNumber}</LineNumber>
    </>
  );
};

const Line = ({ change }: LineProps): JSX.Element => {
  const displayContent = change.content;

  let codeBackgroundColor: string;
  let lineNumBackgroundColor: string;
  let rightNum: number | null;
  let leftNum: number | null;

  switch (change.type) {
    case 'add': {
      codeBackgroundColor = Color.LightGreen;
      lineNumBackgroundColor = Color.LineNumberGreen;
      rightNum = null;
      leftNum = change.ln;
      break;
    }
    case 'del': {
      codeBackgroundColor = Color.LightRed;
      lineNumBackgroundColor = Color.LineNumberRed;
      rightNum = change.ln;
      leftNum = null;
      break;
    }
    case 'normal': {
      codeBackgroundColor = Color.White;
      lineNumBackgroundColor = Color.LineNumberGray;
      rightNum = change.ln1;
      leftNum = change.ln2;
      break;
    }
  }

  return (
    <TableRow>
      <LineNumbersSection
        backgroundColor={lineNumBackgroundColor}
        leftNumber={leftNum}
        rightNumber={rightNum}
      />
      <FullWidthTableData>
        <LineCode backgroundColor={codeBackgroundColor}>
          {displayContent}
        </LineCode>
      </FullWidthTableData>
    </TableRow>
  );
};

const Chunk = ({ chunk }: ChunkProps): JSX.Element => {
  return (
    <div>
      {chunk.changes.map(
        (change, index): JSX.Element => {
          return <Line key={index} change={change} />;
        }
      )}
    </div>
  );
};

// TODO
const ChunkSeparator = (): JSX.Element => {
  return <div />;
};

const FileDiff = ({ filename, chunks }: FileDiffProps): JSX.Element => {
  return (
    <Card header={getFilenameHeader(filename)}>
      <Table>
        {chunks.map(
          (chunk, index): JSX.Element => {
            return (
              <div key={chunk.content}>
                <Chunk chunk={chunk} />
                {index !== chunks.length - 1 && <ChunkSeparator />}
              </div>
            );
          }
        )}
      </Table>
    </Card>
  );
};

export { FileDiff };
