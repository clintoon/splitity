import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { InfoPanel } from './InfoPanel';
import { Color } from '@web/design/styles/color';

const TITLE = 'title123';
const ILLUSTRATION_TESTID = 'illustration testid';

const bulletPointsData = [
  'Split big pull requests into atomic code reviews and encourage good pull request practices within your team.',
  'Save the time and trouble with doing it manually. Just click and go.',
];

interface RenderInfoPanelResult {
  renderResult: RenderResult;
}

const renderInfoPanel = (): RenderInfoPanelResult => {
  const renderResult = render(
    <InfoPanel
      title={TITLE}
      color={Color.Gray100}
      bulletPoints={bulletPointsData}
      illustration={<div data-testid={ILLUSTRATION_TESTID} />}
    />
  );

  return { renderResult };
};

describe('<InfoPanel/>', (): void => {
  it('renders title', (): void => {
    const { renderResult } = renderInfoPanel();
    expect(renderResult.queryByText(TITLE)).not.toBe(null);
  });

  it('renders illustration', (): void => {
    const { renderResult } = renderInfoPanel();
    expect(renderResult.queryByTestId(ILLUSTRATION_TESTID)).not.toBe(null);
  });

  it('renders bulletPointsData', (): void => {
    const { renderResult } = renderInfoPanel();
    expect(renderResult.queryByText(bulletPointsData[0])).not.toBe(null);
    expect(renderResult.queryByText(bulletPointsData[1])).not.toBe(null);
  });
});
