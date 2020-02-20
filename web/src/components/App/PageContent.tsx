import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from '@web/components/App/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { GithubDashboard } from '@web/pages/GithubDashboard/GithubDashboard';
import { RoutePath, GithubRoutePath } from '@web/constants/routes';
import { PullRequestSplittingPage } from '@web/pages/PullRequestSplittingPage/PullRequestSplittingPage';
import { useStore } from '@web/stores/useStore';
import { NotFoundPage } from '@web/pages/NotFoundPage/NotFoundPage';
import { TermsAndConditionsPage } from '@web/pages/TermsAndConditionsPage/TermsAndConditionsPage';
import { PrivacyPolicyPage } from '@web/pages/PrivacyPolicyPage/PrivacyPolicyPage';

const PAGE_CONTENT_TESTID = 'page-content';

const PageContent = (): JSX.Element => {
  const store = useStore();
  const isLoggedIn = store.auth.isLoggedIn();

  return (
    <div data-testid={PAGE_CONTENT_TESTID}>
      <Navbar />
      <Switch>
        <Route exact path={RoutePath.Root} component={HomePage} />
        <Route
          exact
          path={GithubRoutePath.AppRoot}
          component={isLoggedIn ? GithubDashboard : NotFoundPage}
        />
        <Route
          exact
          path={`${GithubRoutePath.AppRoot}/:owner/:repoName/pull/:pullRequestId`}
          component={isLoggedIn ? PullRequestSplittingPage : NotFoundPage}
        />
        <Route
          exact
          path={RoutePath.TermsAndConditions}
          component={TermsAndConditionsPage}
        />
        <Route
          exact
          path={RoutePath.PrivacyPolicy}
          component={PrivacyPolicyPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export { PageContent, PAGE_CONTENT_TESTID };
