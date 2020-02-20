import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Footer } from './Footer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const TEXT = 'footer text123';
const TERMS_LABEL = 'Terms & conditions';

interface RenderFooterResult {
  renderResult: RenderResult;
}

const renderFooter = (): RenderFooterResult => {
  const history = createMemoryHistory();

  const renderResult = render(
    <Router history={history}>
      <Footer
        text={TEXT}
        links={[
          {
            id: 'terms',
            text: TERMS_LABEL,
            to: '/',
          },
        ]}
      />
    </Router>
  );

  return { renderResult };
};

describe('<Footer/>', (): void => {
  it('renders text', (): void => {
    const { renderResult } = renderFooter();
    expect(renderResult.queryByText(TEXT)).not.toBe(null);
  });

  it('renders link', (): void => {
    const { renderResult } = renderFooter();
    expect(renderResult.queryByText(TERMS_LABEL)).not.toBe(null);
  });
});
