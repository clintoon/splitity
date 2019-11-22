import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { GithubDashboard } from '@web/pages/GithubDashboard/GithubDashboard';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { INSTALL_APP_NOTICE_TESTID } from './InstallAppNotice';
import { PULL_REQUEST_SELECTION } from './PullRequestSelection';
import { Router } from 'react-router';
import { createMemoryHistory, History } from 'history';
import { GithubRoutePath } from '@web/constants/routes';

jest.mock('@web/lib/github/github');

const GITHUB_INSTALLATION_ID = 123;

interface SetupGithubDashboardOptions {
  installedGithubApp: boolean;
}

interface SetupGithubDashboardResult {
  renderResult: RenderResult;
  history: History;
}

const setupGithubDashboard = (
  options: SetupGithubDashboardOptions
): SetupGithubDashboardResult => {
  const githubInstallationId = options.installedGithubApp
    ? GITHUB_INSTALLATION_ID
    : null;

  const storeOptions = {
    auth: { currentUser: currentUserFactory({ githubInstallationId }) },
  };

  const stores = mockStoreFactory(storeOptions);

  const history = createMemoryHistory({
    initialEntries: [GithubRoutePath.AppRoot],
  });

  const renderResult = render(
    <Router history={history}>
      <TestStoreProvider stores={stores}>
        <GithubDashboard />
      </TestStoreProvider>
    </Router>
  );

  return { renderResult, history };
};

describe('GithubDashboard', (): void => {
  it('displays install app notice when user has not installed github app', (): void => {
    const { renderResult } = setupGithubDashboard({
      installedGithubApp: false,
    });

    expect(renderResult.queryByTestId(INSTALL_APP_NOTICE_TESTID)).not.toBe(
      null
    );
  });

  it('displays pull requests selection when user has installed github app', (): void => {
    const { renderResult } = setupGithubDashboard({
      installedGithubApp: true,
    });

    expect(renderResult.queryByTestId(PULL_REQUEST_SELECTION)).not.toBe(null);
  });
});
