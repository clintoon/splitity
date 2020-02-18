import React from 'react';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TestStoreProvider, mockStoreFactory } from '@web/testing/mockStore';
import {
  SplitityLogoButton,
  SPLITITY_LOGO_BUTTON_TESTID,
} from './SplitityLogoButton';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { createMemoryHistory, MemoryHistory } from 'history';
import { RoutePath, GithubRoutePath } from '@web/constants/routes';

interface RenderSplitityLogoButtonOptions {
  isLoggedIn: boolean;
  initialRoute: string;
}

interface RenderSplitityLogoButtonResult {
  renderResult: RenderResult;
  history: MemoryHistory;
}

const renderSplitityLogoButton = (
  options: RenderSplitityLogoButtonOptions
): RenderSplitityLogoButtonResult => {
  const storeOptions = options.isLoggedIn
    ? {
        auth: {
          currentUser: currentUserFactory(),
        },
      }
    : undefined;
  const stores = mockStoreFactory(storeOptions);

  const history = createMemoryHistory({
    initialEntries: [options.initialRoute],
  });

  const renderResult = render(
    <Router history={history}>
      <TestStoreProvider stores={stores}>
        <SplitityLogoButton />
      </TestStoreProvider>
    </Router>
  );

  return { renderResult, history };
};

describe('<SplitityLogoButton/>', (): void => {
  it('redirects to home page if not logged in', (): void => {
    const { renderResult, history } = renderSplitityLogoButton({
      isLoggedIn: false,
      initialRoute: '/test',
    });

    const buttonContainer = renderResult.getByTestId(
      SPLITITY_LOGO_BUTTON_TESTID
    );

    fireEvent.click(buttonContainer);

    expect(history.location.pathname).toBe(RoutePath.Root);
  });

  it('redirects to github dashboard if logged in', (): void => {
    const { renderResult, history } = renderSplitityLogoButton({
      isLoggedIn: true,
      initialRoute: '/test',
    });

    const buttonContainer = renderResult.getByTestId(
      SPLITITY_LOGO_BUTTON_TESTID
    );

    fireEvent.click(buttonContainer);

    expect(history.location.pathname).toBe(GithubRoutePath.AppRoot);
  });
});
