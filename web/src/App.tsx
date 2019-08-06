import React from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';

const App: React.FC<{}> = (): JSX.Element => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <div>Hello world!</div>
    </React.Fragment>
  );
};

export { App };
