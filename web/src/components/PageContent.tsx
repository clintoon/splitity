import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navbar } from '@web/components/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';

const PageContent = (): JSX.Element => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={HomePage} />
      </BrowserRouter>
    </div>
  );
};

export { PageContent };
