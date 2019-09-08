import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '@web/components/App/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { RoutePath } from '@web/constants/routes';

const PAGE_CONTENT_TESTID = 'page-content';

const PageContent = (): JSX.Element => {
  return (
    <div data-testid={PAGE_CONTENT_TESTID}>
      <Navbar />
      <Route exact path={RoutePath.Root} component={HomePage} />
    </div>
  );
};

export { PageContent, PAGE_CONTENT_TESTID };
