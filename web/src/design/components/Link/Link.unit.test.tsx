import React from 'react';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import { Link, LINK_TESTID } from './Link';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

const LINK_REDIRECT_TO = '/potato';
const LINK_LABEL = 'link123';

interface RenderLinkResult {
  renderResult: RenderResult;
  history: MemoryHistory;
}

const renderLink = (): RenderLinkResult => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  const renderResult = render(
    <Router history={history}>
      <Link to={LINK_REDIRECT_TO}>{LINK_LABEL}</Link>
    </Router>
  );

  return { renderResult, history };
};

describe('<Link/>', (): void => {
  it('redirects to correct route when clicked', (): void => {
    const { history, renderResult } = renderLink();
    fireEvent.click(renderResult.getByTestId(LINK_TESTID));
    expect(history.location.pathname).toBe(LINK_REDIRECT_TO);
  });

  it('renders children', (): void => {
    const { renderResult } = renderLink();
    expect(renderResult.queryByText(LINK_LABEL)).not.toBe(null);
  });
});
