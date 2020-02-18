import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { IllustrationDisplay } from './IllustrationDisplay';

const EXAMPLE_TEST_ID = 'example img test';
const EXAMPLE_TEXT = 'text123';

interface RenderIllustrationDisplayResult {
  renderResult: RenderResult;
}

const renderIllustrationDisplay = (): RenderIllustrationDisplayResult => {
  const renderResult = render(
    <IllustrationDisplay
      img={<div data-testid={EXAMPLE_TEST_ID} />}
      text={EXAMPLE_TEXT}
    />
  );

  return { renderResult };
};

describe('<IllustrationDisplay/>', (): void => {
  it('renders illustration if passed in', (): void => {
    const { renderResult } = renderIllustrationDisplay();

    expect(renderResult.queryByTestId(EXAMPLE_TEST_ID)).not.toBe(null);
  });

  it('renders text if passed in', (): void => {
    const { renderResult } = renderIllustrationDisplay();

    expect(renderResult.queryByText(EXAMPLE_TEXT)).not.toBe(null);
  });
});
