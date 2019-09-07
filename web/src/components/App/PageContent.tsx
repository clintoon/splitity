import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '@web/components/App/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { RoutePath } from '@web/constants/routes';

const PageContent = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Route exact path={RoutePath.Root} component={HomePage} />
    </div>
  );
};

export { PageContent };
