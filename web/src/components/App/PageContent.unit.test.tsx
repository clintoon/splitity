import React from 'react';
import { RenderResult, render, wait } from '@testing-library/react';
import { PageContent } from './PageContent';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { GithubRoutePath, RoutePath } from '@web/constants/routes';
import { PAGE_NOT_FOUND_TESTID } from '@web/pages/NotFoundPage/NotFoundPage';
import { GITHUB_DASHBOARD_PAGE_TESTID } from '@web/pages/GithubDashboard/GithubDashboard';
import { PULL_REQUEST_SPLITTING_PAGE_TESTID } from '@web/pages/PullRequestSplittingPage/PullRequestSplittingPage';
import { TERMS_AND_CONDITIONS_TESTID } from '@web/pages/TermsAndConditionsPage/TermsAndConditionsPage';
import { PRIVACY_POLICY_TESTID } from '@web/pages/PrivacyPolicyPage/PrivacyPolicyPage';

jest.mock('@web/lib/github/github');
jest.mock('@web/lib/backend/backendApi');
jest.mock('@web/lib/analytics/tracking');
interface RenderPageContentOptions {
  isLoggedIn: boolean;
  initialRoute: string;
}

interface RenderPageContentResult {
  renderResult: RenderResult;
  history: MemoryHistory;
}

const renderPageContent = ({
  isLoggedIn,
  initialRoute,
}: RenderPageContentOptions): RenderPageContentResult => {
  const storeOptions = isLoggedIn
    ? {
        auth: {
          currentUser: currentUserFactory(),
        },
      }
    : undefined;
  const stores = mockStoreFactory(storeOptions);
  const history = createMemoryHistory({ initialEntries: [initialRoute] });

  const renderResult = render(
    <Router history={history}>
      <TestStoreProvider stores={stores}>
        <PageContent />
      </TestStoreProvider>
    </Router>
  );

  return { renderResult, history };
};

describe('<PageContent/>', (): void => {
  it('renders not found page on /gh route if not logged in', (): void => {
    const { renderResult } = renderPageContent({
      isLoggedIn: false,
      initialRoute: GithubRoutePath.AppRoot,
    });

    expect(renderResult.queryByTestId(PAGE_NOT_FOUND_TESTID)).not.toBe(null);
  });

  it('renders not found page on split pr route if not logged in', (): void => {
    const { renderResult } = renderPageContent({
      isLoggedIn: false,
      initialRoute: '/gh/clintoon/test01/pull/9',
    });

    expect(renderResult.queryByTestId(PAGE_NOT_FOUND_TESTID)).not.toBe(null);
  });

  it('renders not found page on random invalid route if not logged in', (): void => {
    const { renderResult } = renderPageContent({
      isLoggedIn: false,
      initialRoute: 'pizza123',
    });

    expect(renderResult.queryByTestId(PAGE_NOT_FOUND_TESTID)).not.toBe(null);
  });

  it('renders found page on /gh route if logged in', async (): Promise<
    void
  > => {
    const { renderResult } = renderPageContent({
      isLoggedIn: true,
      initialRoute: GithubRoutePath.AppRoot,
    });

    await wait((): void => {
      expect(renderResult.queryByTestId(PAGE_NOT_FOUND_TESTID)).toBe(null);
      expect(renderResult.queryByTestId(GITHUB_DASHBOARD_PAGE_TESTID)).not.toBe(
        null
      );
    });
  });

  it('renders found page on split pr route if logged in', async (): Promise<
    void
  > => {
    const { renderResult } = renderPageContent({
      isLoggedIn: true,
      initialRoute: '/gh/clintoon/test01/pull/9',
    });

    await wait((): void => {
      expect(renderResult.queryByTestId(PAGE_NOT_FOUND_TESTID)).toBe(null);
      expect(
        renderResult.queryByTestId(PULL_REQUEST_SPLITTING_PAGE_TESTID)
      ).not.toBe(null);
    });
  });

  it('renders terms and conditions page when on the terms route', (): void => {
    const { renderResult } = renderPageContent({
      isLoggedIn: false,
      initialRoute: RoutePath.TermsAndConditions,
    });

    expect(renderResult.queryByTestId(TERMS_AND_CONDITIONS_TESTID)).not.toBe(
      null
    );
  });

  it('renders the privacy policy page when on the privacy policy route', (): void => {
    const { renderResult } = renderPageContent({
      isLoggedIn: false,
      initialRoute: RoutePath.PrivacyPolicy,
    });

    expect(renderResult.queryByTestId(PRIVACY_POLICY_TESTID)).not.toBe(null);
  });
});
