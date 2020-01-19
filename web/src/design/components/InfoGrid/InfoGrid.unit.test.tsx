import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { InfoGrid } from './InfoGrid';
import { Color } from '@web/design/styles/color';

const TITLE = 'title123';
const itemsData = [
  {
    head: 'Allocate your changes across different pull requests.',
    content:
      'Use our easy to use interface to click and highlight code changes within and across your files into different pull requests',
  },
  {
    head: 'Split',
    content:
      'When your ready, with the click of a button, we will automatically create the newly split pull requests',
  },
];

interface RenderInfoGridResult {
  renderResult: RenderResult;
}

const renderInfoGrid = (): RenderInfoGridResult => {
  const renderResult = render(
    <InfoGrid title={TITLE} color={Color.Gray100} items={itemsData} />
  );
  return { renderResult };
};

describe('<InfoGrid/>', (): void => {
  it('renders title', (): void => {
    const { renderResult } = renderInfoGrid();
    expect(renderResult.queryByText(TITLE)).not.toBe(null);
  });

  it('renders items', (): void => {
    const { renderResult } = renderInfoGrid();
    expect(renderResult.queryByText(itemsData[0].head)).not.toBe(null);
    expect(renderResult.queryByText(itemsData[0].content)).not.toBe(null);
    expect(renderResult.queryByText(itemsData[1].head)).not.toBe(null);
    expect(renderResult.queryByText(itemsData[1].content)).not.toBe(null);
  });
});
