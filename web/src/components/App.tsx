import React from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/PageContent';

const App: React.FC<{}> = (): JSX.Element => {
  // TODO Listen for auth state changed with onAuthStateChanged
  return (
    <React.Fragment>
      <GlobalStyle />
      <PageContent />
    </React.Fragment>
  );
};

export { App };
