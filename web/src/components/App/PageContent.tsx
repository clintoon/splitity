import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '@web/components/App/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { GithubDashboardPage } from '@web/pages/GithubDashboard/GithubDashboard';
import { RoutePath, GithubRoutePath } from '@web/constants/routes';

const PAGE_CONTENT_TESTID = 'page-content';

const PageContent = (): JSX.Element => {
  return (
    <div data-testid={PAGE_CONTENT_TESTID}>
      <Navbar />
      <Route exact path={RoutePath.Root} component={HomePage} />
      <Route
        exact
        path={GithubRoutePath.AppRoot}
        component={GithubDashboardPage}
      />
    </div>
  );
};

export { PageContent, PAGE_CONTENT_TESTID };
