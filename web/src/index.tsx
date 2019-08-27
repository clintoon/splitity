import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@web/components/App';
import { StoreProvider } from '@web/stores/storeProvider';

const rootContainer = document.getElementById('root');

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  rootContainer
);
