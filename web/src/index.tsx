import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@web/components/App/App';
import { StoreProvider } from '@web/stores/storeProvider';
import { BrowserRouter } from 'react-router-dom';
import { initializeTracking } from './lib/analytics/tracking';

initializeTracking();
const rootContainer = document.getElementById('root');

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  rootContainer
);
