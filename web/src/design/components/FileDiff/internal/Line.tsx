import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import parseDiff from 'parse-diff';
import { Color } from '@web/design/styles/color';

const FILE_DIFF_LINE_TESTID = 'file diff line testid';
const FILE_DIFF_LEFT_LINE_NUMBER_TESTID = 'file diff left line number testid';
const FILE_DIFF_RIGHT_LINE_NUMBER_TESTID = 'file diff right line number testid';
const FILE_DIFF_SYMBOL_TESTID = 'file diff symbol testid';

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

const Symbol = styled.span`
  margin: 0 8px;
`;

const FullWidthTableData = styled.td`
  padding: 0;
  margin: 0;
  width: 100%;
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
      <LineNumber
        data-testid={FILE_DIFF_LEFT_LINE_NUMBER_TESTID}
        backgroundColor={backgroundColor}
      >
        {rightNumber}
      </LineNumber>
      <LineNumber
        data-testid={FILE_DIFF_RIGHT_LINE_NUMBER_TESTID}
        backgroundColor={backgroundColor}
      >
        {leftNumber}
      </LineNumber>
    </>
  );
};

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
    <TableRow data-testid={FILE_DIFF_LINE_TESTID}>
      <LineNumbersSection
        backgroundColor={lineNumBackgroundColor}
        leftNumber={leftNum}
        rightNumber={rightNum}
      />
      <FullWidthTableData>
        <LineCode backgroundColor={codeBackgroundColor}>
          <Symbol data-testid={FILE_DIFF_SYMBOL_TESTID}>{symbol}</Symbol>
          {displayContent}
        </LineCode>
      </FullWidthTableData>
    </TableRow>
  );
};

export {
  Line,
  FILE_DIFF_LINE_TESTID,
  FILE_DIFF_LEFT_LINE_NUMBER_TESTID,
  FILE_DIFF_RIGHT_LINE_NUMBER_TESTID,
  FILE_DIFF_SYMBOL_TESTID,
};
