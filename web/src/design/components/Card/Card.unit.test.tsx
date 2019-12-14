import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Card } from '@web/design/components/Card/Card';

interface RenderCardResult {
  renderResult: RenderResult;
}

const HEADER = 'header';
const BODY_TEXT = 'body text123';

const renderCard = (): RenderCardResult => {
  const renderResult = render(
    <Card header={HEADER}>
      <div>{BODY_TEXT}</div>
    </Card>
  );
  return { renderResult };
};

describe('<Card />', (): void => {
  it('renders the header', (): void => {
    const { renderResult } = renderCard();
    expect(renderResult.queryByText(HEADER)).not.toBe(null);
  });

  it('renders the body', (): void => {
    const { renderResult } = renderCard();
    expect(renderResult.queryByText(BODY_TEXT)).not.toBe(null);
  });
});
