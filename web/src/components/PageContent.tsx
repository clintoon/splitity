import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '@web/components/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { ToSignInPage } from '@web/pages/Auth/ToSignInPage';
import { AuthRoutePath, RoutePath } from '@web/constants/routes';

const PageContent = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Route exact path={RoutePath.Root} component={HomePage} />
      {/* TODO don't show the Navbar at this route */}
      <Route exact path={AuthRoutePath.ToSignIn} component={ToSignInPage} />
    </div>
  );
};

export { PageContent };
