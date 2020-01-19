import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Footer } from './Footer';

const TEXT = 'footer text123';

interface RenderFooterResult {
  renderResult: RenderResult;
}

const renderFooter = (): RenderFooterResult => {
  const renderResult = render(<Footer text={TEXT} />);
  return { renderResult };
};

describe('<Footer/>', (): void => {
  it('renders text', (): void => {
    const { renderResult } = renderFooter();
    expect(renderResult.queryByText(TEXT)).not.toBe(null);
  });
});
