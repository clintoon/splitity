import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navbar } from '@web/components/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { ToSignInPage } from '@web/pages/Auth/ToSignInPage';
import { RoutePath } from '@web/constants/routes';

const PageContent = (): JSX.Element => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route exact path={RoutePath.RootRoute} component={HomePage} />
        {/* TODO don't show the Navbar at this route */}
        <Route
          exact
          path={RoutePath.AuthToSignInRoute}
          component={ToSignInPage}
        />
      </BrowserRouter>
    </div>
  );
};

export { PageContent };
