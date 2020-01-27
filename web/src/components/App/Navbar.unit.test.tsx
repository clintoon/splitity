import React from 'react';
import {
  Navbar,
  NAVBAR_SIGNIN_TESTID,
  NAVBAR_SIGN_OUT_TESTID,
} from '@web/components/App/Navbar';
import { RenderResult, render, within } from '@testing-library/react';
import { Router } from 'react-router';
import { TestStoreProvider, mockStoreFactory } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { createMemoryHistory } from 'history';
import { GithubRoutePath } from '@web/constants/routes';

interface RenderNavbarOptions {
  userLoggedIn: boolean;
  initialRoute: string;
}

interface RenderNavbarResult {
  renderResult: RenderResult;
}

const renderNavbar = (options: RenderNavbarOptions): RenderNavbarResult => {
  const storeOptions = options.userLoggedIn
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
        <Navbar />
      </TestStoreProvider>
    </Router>
  );

  return { renderResult };
};

describe('<Navbar/>', (): void => {
  it('displays the sign in button when user is not logged in', (): void => {
    const { renderResult } = renderNavbar({
      initialRoute: GithubRoutePath.AppRoot,
      userLoggedIn: false,
    });

    const signinContainer = renderResult.getByTestId(NAVBAR_SIGNIN_TESTID);

    const signinButton = within(signinContainer).queryByTestId(BUTTON_TESTID);

    expect(signinButton).not.toBe(null);
  });

  it('displays the sign out button when user is logged in', (): void => {
    const { renderResult } = renderNavbar({
      initialRoute: GithubRoutePath.AppRoot,
      userLoggedIn: true,
    });

    const signOutContainer = renderResult.getByTestId(NAVBAR_SIGN_OUT_TESTID);

    const signOutButton = within(signOutContainer).queryByTestId(BUTTON_TESTID);

    expect(signOutButton).not.toBe(null);
  });
});
