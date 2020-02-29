import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from '@web/components/App/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { GithubDashboard } from '@web/pages/GithubDashboard/GithubDashboard';
import { RoutePath, GithubRoutePath, AuthPath } from '@web/constants/routes';
import { PullRequestSplittingPage } from '@web/pages/PullRequestSplittingPage/PullRequestSplittingPage';
import { useStore } from '@web/stores/useStore';
import { NotFoundPage } from '@web/pages/NotFoundPage/NotFoundPage';
import { TermsAndConditionsPage } from '@web/pages/TermsAndConditionsPage/TermsAndConditionsPage';
import { PrivacyPolicyPage } from '@web/pages/PrivacyPolicyPage/PrivacyPolicyPage';
import { Footer } from './Footer';
import { AuthCallbackPage } from '@web/pages/AuthCallbackPage/AuthCallbackPage';

const PAGE_CONTENT_TESTID = 'page-content';

const BodySection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentSection = styled.div`
  flex: 1 0 auto;
`;

const PageContent = (): JSX.Element => {
  const store = useStore();
  const isLoggedIn = store.auth.isLoggedIn();

  return (
    <BodySection data-testid={PAGE_CONTENT_TESTID}>
      <ContentSection>
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
          <Route exact path={AuthPath.Callback} component={AuthCallbackPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ContentSection>
      <Footer />
    </BodySection>
  );
};

export { PageContent, PAGE_CONTENT_TESTID };
