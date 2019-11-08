import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@web/components/App/App';
import { StoreProvider } from '@web/stores/storeProvider';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { githubClient } from '@web/lib/apollo/github/githubClient';

const rootContainer = document.getElementById('root');

ReactDOM.render(
  <ApolloProvider client={githubClient}>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </ApolloProvider>,
  rootContainer
);
