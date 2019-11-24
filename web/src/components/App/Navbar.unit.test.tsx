import React from 'react';
import { Navbar, NAVBAR_ADD_REPOS_TESTID } from '@web/components/App/Navbar';
import {
  RenderResult,
  render,
  within,
  fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router';
import { TestStoreProvider, mockStoreFactory } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { createMemoryHistory } from 'history';
import { GithubRoutePath } from '@web/constants/routes';
import * as openPage from '@web/lib/actions/openPage';
import { noop } from 'lodash';

interface RenderNavbarOptions {
  userLoggedIn: boolean;
  githubAppInstalled: boolean;
  initialRoute: string;
}

interface RenderNavbarResult {
  renderResult: RenderResult;
  onAddReposClickSpy: jest.SpyInstance;
}

const GITHUB_INSTALLATION_ID = 123;

const renderNavbar = (options: RenderNavbarOptions): RenderNavbarResult => {
  const onAddReposClickSpy = jest
    .spyOn(openPage, 'onAddReposClick')
    .mockImplementation(noop);

  const githubInstallationId = options.githubAppInstalled
    ? GITHUB_INSTALLATION_ID
    : null;

  const storeOptions = options.userLoggedIn
    ? {
        auth: {
          currentUser: currentUserFactory({ githubInstallationId }),
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

  return { renderResult, onAddReposClickSpy };
};

describe('<Navbar/>', (): void => {
  it('displays the add repos button when user has installed the github app on the github dashboard', (): void => {
    const { renderResult } = renderNavbar({
      initialRoute: GithubRoutePath.AppRoot,
      userLoggedIn: true,
      githubAppInstalled: true,
    });

    const addReposContainer = renderResult.getByTestId(NAVBAR_ADD_REPOS_TESTID);

    const addReposButton = within(addReposContainer).queryByTestId(
      BUTTON_TESTID
    );

    expect(addReposButton).not.toBe(null);
  });

  it('calls onAddReposClick when the add repos button is clicked on the github dashboard', (): void => {
    const { renderResult, onAddReposClickSpy } = renderNavbar({
      initialRoute: GithubRoutePath.AppRoot,
      userLoggedIn: true,
      githubAppInstalled: true,
    });

    const addReposContainer = renderResult.getByTestId(NAVBAR_ADD_REPOS_TESTID);
    const addReposButton = within(addReposContainer).getByTestId(BUTTON_TESTID);

    fireEvent.click(addReposButton);

    expect(onAddReposClickSpy).toBeCalled();
  });

  it('does not display the add repos button when user has not installed the github app on the github dashboard', (): void => {
    const { renderResult } = renderNavbar({
      initialRoute: GithubRoutePath.AppRoot,
      userLoggedIn: true,
      githubAppInstalled: false,
    });

    const addReposContainer = renderResult.queryByTestId(
      NAVBAR_ADD_REPOS_TESTID
    );
    expect(addReposContainer).toBe(null);
  });

  it('does not display the add repos button when user has not logged in  on the github dashboard', (): void => {
    const { renderResult } = renderNavbar({
      initialRoute: GithubRoutePath.AppRoot,
      userLoggedIn: false,
      githubAppInstalled: false,
    });

    const addReposContainer = renderResult.queryByTestId(
      NAVBAR_ADD_REPOS_TESTID
    );
    expect(addReposContainer).toBe(null);
  });
});
