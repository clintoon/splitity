import React from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { Navbar } from '@web/design/components/Navbar/Navbar';
import { Button, ButtonStyle } from '@web/design/components/Button/Button';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from '@web/pages/HomePage/HomePage';

const renderPages = (): JSX.Element => {
  return (
    <div>
      <Navbar
        rightItems={[
          <Button key="login" styleOf={ButtonStyle.Primary}>
            Login
          </Button>,
        ]}
      />
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
      </BrowserRouter>
    </div>
  );
};

const App: React.FC<{}> = (): JSX.Element => {
  return (
    <React.Fragment>
      <GlobalStyle />
      {renderPages()}
    </React.Fragment>
  );
};

export { App };
