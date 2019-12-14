import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Card } from '@web/design/components/Card/Card';
import parseDiff from 'parse-diff';
import { Color } from '@web/design/styles/color';
import { codeFontFamily } from '@web/design/styles/font';

interface FilenameChange {
  from?: string;
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

interface TableDataProps {
  backgroundColor?: string;
}

interface LineCodeProps {
  backgroundColor: string;
}

interface LineNumbersSection {
  backgroundColor: string;
  rightNumber: number | null;
  leftNumber: number | null;
}

const getFilenameHeader = (filename: FilenameChange): string | undefined => {
  if (filename.from === filename.to) {
    return filename.from || filename.from;
  }

  if (!filename.from) {
    return filename.to;
  }

  if (!filename.to) {
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
  font-size: 12px;
`;

const TableRow = styled.tr`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const LineNumber = styled.td<TableDataProps>`
  margin: 0;
  padding: 0 8px;
  color: ${Color.Gray};
  text-align: right;
  min-width: 32px;

  ${({ backgroundColor }): FlattenSimpleInterpolation | null => {
    return backgroundColor
      ? css`
          background-color: ${backgroundColor};
        `
      : null;
  }};
`;

const FullWidthTableData = styled.td`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const LineCode = styled.div<LineCodeProps>`
  line-height: 20px;
  white-space: pre;
  background-color: ${({ backgroundColor }): string => backgroundColor};
`;

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

const Symbol = styled.span`
  margin: 0 8px;
`;

const Line = ({ change }: LineProps): JSX.Element => {
  const symbol = change.content.charAt(0);
  const displayContent = change.content.substr(1);

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
          <Symbol>{symbol}</Symbol>
          {displayContent}
        </LineCode>
      </FullWidthTableData>
    </TableRow>
  );
};

const Chunk = ({ chunk }: ChunkProps): JSX.Element => {
  return (
    <React.Fragment>
      {chunk.changes.map(
        (change, index): JSX.Element => {
          return <Line key={index} change={change} />;
        }
      )}
    </React.Fragment>
  );
};

const ChunkSeparator = styled.tr`
  height: 30px;
  background-color: ${Color.LightBlue};
`;

const FileDiff = ({ filename, chunks }: FileDiffProps): JSX.Element => {
  return (
    <Card header={getFilenameHeader(filename) || ''}>
      <Table>
        <tbody>
          {chunks.map(
            (chunk, index): JSX.Element => {
              return (
                <React.Fragment key={chunk.content}>
                  <Chunk chunk={chunk} />
                  {index !== chunks.length - 1 && (
                    <ChunkSeparator>
                      <td colSpan={3} />
                    </ChunkSeparator>
                  )}
                </React.Fragment>
              );
            }
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export { FileDiff };
