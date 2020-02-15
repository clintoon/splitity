import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@web/components/App/App';
import { StoreProvider } from '@web/stores/storeProvider';
import { BrowserRouter } from 'react-router-dom';
import { initializeTracking } from './lib/analytics/tracking';
import { sentryConfig } from '@web/config/sentry';
import { environmentConfig } from '@web/config/environment';
import * as Sentry from '@sentry/browser';

initializeTracking();
Sentry.init({
  dsn: sentryConfig.dsn,
  environment: environmentConfig.env,
});
const rootContainer = document.getElementById('root');

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  rootContainer
);
