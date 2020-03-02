import React from 'react';
import { render, RenderResult, wait } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router';

import { App, APP_LOADING } from '@web/components/App/App';
import { StoreType } from '@web/stores/storeProvider';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';
import { RoutePath } from '@web/constants/routes';
import { PAGE_CONTENT_TESTID } from '@web/components/App/PageContent';
import { NAVBAR_TESTID } from '@web/design/components/Navbar/Navbar';

import { BackendAPI } from '@web/lib/backend/backendApi';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { clearAuthCookie } from '@web/lib/cookie/authCookie';
import { resetTracking } from '@web/lib/analytics/tracking';

jest.mock('@web/lib/cookie/authCookie');
jest.mock('@web/lib/analytics/tracking');
jest.mock('react-player');

const USER_ID = 123;

interface RenderAppOptions {
  initialRoute: string;
  isAuthenticated: boolean;
  initialStoreAuthenticated: boolean;
}

interface RenderAppResult {
  renderResult: RenderResult;
  stores: StoreType;
  history: MemoryHistory;
}

const renderApp = (options: RenderAppOptions): RenderAppResult => {
  const { isAuthenticated, initialRoute } = options;

  if (isAuthenticated) {
    jest
      .spyOn(BackendAPI.prototype, 'getCurrentUser')
      .mockResolvedValue({ userId: USER_ID });
  } else {
    jest.spyOn(BackendAPI.prototype, 'getCurrentUser').mockRejectedValue({
      response: {
        status: 401,
      },
    });
  }

  const storeOptions = options.initialStoreAuthenticated
    ? {
        auth: {
          currentUser: {
            ...currentUserFactory(),
          },
        },
      }
    : undefined;
  const stores = mockStoreFactory(storeOptions);
  const history = createMemoryHistory({ initialEntries: [initialRoute] });

  const renderResult = render(
    <Router history={history}>
      <TestStoreProvider stores={stores}>
        <App />
      </TestStoreProvider>
    </Router>
  );

  return {
    renderResult,
    stores,
    history,
  };
};

describe('<App/>', (): void => {
  it('displays loading screen when still loading', async (): Promise<void> => {
    const { renderResult } = renderApp({
      initialRoute: RoutePath.Root,
      isAuthenticated: false,
      initialStoreAuthenticated: false,
    });
    expect(renderResult.queryByTestId(APP_LOADING)).not.toBe(null);
    await wait();
  });

  it('displays the page content is done loading', async (): Promise<void> => {
    const { renderResult } = renderApp({
      initialRoute: RoutePath.Root,
      isAuthenticated: false,
      initialStoreAuthenticated: false,
    });
    await wait((): void => {
      expect(renderResult.queryByTestId(PAGE_CONTENT_TESTID)).not.toBe(null);
    });
  });

  it('logs in the user if user is authenticated', async (): Promise<void> => {
    const { stores } = renderApp({
      initialRoute: RoutePath.Root,
      isAuthenticated: true,
      initialStoreAuthenticated: false,
    });
    await wait((): void => {
      expect(stores.auth.isLoggedIn()).toBe(true);
    });
  });

  it('logs out the user if not authenticated', async (): Promise<void> => {
    const { stores } = renderApp({
      initialRoute: RoutePath.Root,
      isAuthenticated: false,
      initialStoreAuthenticated: true,
    });
    await wait((): void => {
      expect(stores.auth.isLoggedIn()).toBe(false);
      expect(clearAuthCookie).toBeCalled();
      expect(resetTracking).toBeCalled();
    });
  });

  it('displays navbar', async (): Promise<void> => {
    const { renderResult } = renderApp({
      initialRoute: RoutePath.Root,
      isAuthenticated: false,
      initialStoreAuthenticated: false,
    });
    await wait((): void => {
      expect(renderResult.queryByTestId(NAVBAR_TESTID)).not.toBe(null);
    });
  });
});
