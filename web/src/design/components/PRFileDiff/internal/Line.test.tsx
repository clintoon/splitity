import React from 'react';
import { render, RenderResult, within } from '@testing-library/react';
import {
  Line,
  FILE_DIFF_LEFT_LINE_NUMBER_TESTID,
  FILE_DIFF_RIGHT_LINE_NUMBER_TESTID,
  FILE_DIFF_SYMBOL_TESTID,
} from '@web/design/components/PRFileDiff/internal/Line';

interface RenderNormalLineOptions {
  type: 'normal';
  normal: true;
  ln1: number;
  ln2: number;
  content: string;
}

interface RenderAddLineOptions {
  type: 'add';
  add: true;
  ln: number;
  content: string;
}

interface RenderDelLineOptions {
  type: 'del';
  del: true;
  ln: number;
  content: string;
}

interface RenderLineResult {
  renderResult: RenderResult;
}

const renderLine = (
  options: RenderNormalLineOptions | RenderAddLineOptions | RenderDelLineOptions
): RenderLineResult => {
  const renderResult = render(
    <table>
      <tbody>
        <Line change={options} />
      </tbody>
    </table>
  );
  return { renderResult };
};

describe('<Line/>', (): void => {
  it('displays the line number on the right when the line is add', (): void => {
    const { renderResult } = renderLine({
      type: 'add',
      add: true,
      ln: 1,
      content: '+Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });

    const rightLineNumContainer = renderResult.getByTestId(
      FILE_DIFF_RIGHT_LINE_NUMBER_TESTID
    );

    expect(within(rightLineNumContainer).queryByText('1')).not.toBe(null);
  });

  it('displays the line number on the left when the line is del', (): void => {
    const { renderResult } = renderLine({
      type: 'del',
      del: true,
      ln: 1,
      content: '-Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });

    const leftLineNumContainer = renderResult.getByTestId(
      FILE_DIFF_LEFT_LINE_NUMBER_TESTID
    );

    expect(within(leftLineNumContainer).queryByText('1')).not.toBe(null);
  });

  it('displays the line numbers on both sides when the line is normal', (): void => {
    const { renderResult } = renderLine({
      type: 'normal',
      normal: true,
      ln1: 1,
      ln2: 2,
      content: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });

    const leftLineNumContainer = renderResult.getByTestId(
      FILE_DIFF_LEFT_LINE_NUMBER_TESTID
    );
    const rightLineNumContainer = renderResult.getByTestId(
      FILE_DIFF_RIGHT_LINE_NUMBER_TESTID
    );

    expect(within(leftLineNumContainer).queryByText('1')).not.toBe(null);
    expect(within(rightLineNumContainer).queryByText('2')).not.toBe(null);
  });

  it('displays content correctly', (): void => {
    const { renderResult } = renderLine({
      type: 'add',
      add: true,
      ln: 1,
      content: '+Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });

    expect(
      renderResult.queryByText(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      )
    ).not.toBe(null);
  });

  it('displays symbol correctly', (): void => {
    const { renderResult } = renderLine({
      type: 'add',
      add: true,
      ln: 1,
      content: '+Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    });

    const symbolContainer = renderResult.getByTestId(FILE_DIFF_SYMBOL_TESTID);
    expect(within(symbolContainer).findByText('+')).not.toBe(null);
  });
});
