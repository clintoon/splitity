import React from 'react';
import {
  render,
  RenderResult,
  wait,
  within,
  fireEvent,
} from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { mock, when, instance } from 'ts-mockito';
import { User, Unsubscribe } from 'firebase';
import { Router } from 'react-router';

import { App, APP_LOADING } from '@web/components/App/App';
import { StoreType } from '@web/stores/storeProvider';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import * as AuthCookie from '@web/lib/cookie/authCookie';
import { RoutePath, GithubRoutePath } from '@web/constants/routes';
import { PAGE_CONTENT_TESTID } from '@web/components/App/PageContent';
import { clearAuthCookie, setOAuthToken } from '@web/lib/cookie/authCookie';
import { NAVBAR_TESTID } from '@web/design/components/Navbar/Navbar';
import { NAVBAR_SIGNIN_TESTID, NAVBAR_SIGN_OUT_TESTID } from './Navbar';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { handleSignIn } from '@web/lib/eventHandlers/auth';

jest.mock('@web/lib/firebase/auth');
jest.mock('@web/lib/cookie/authCookie');
jest.mock('@web/lib/eventHandlers/auth');
jest.mock('@web/lib/github/github');

const AUTH_TOKEN_COOKIE = 'auth-token-cookie';
const EMAIL = 'clinton@gmail.com';
const EMAIL_VERIFIED = false;
const USER_ID = 'abc123';
const userMock = mock<User>();
when(userMock.email).thenReturn(EMAIL);
when(userMock.emailVerified).thenReturn(EMAIL_VERIFIED);
when(userMock.uid).thenReturn(USER_ID);

interface RenderAppOptions {
  initialRoute: string;
  initialStoreAuthenticated: boolean;
  isAuthenticated: boolean;
  backFromAuthRedirect: boolean;
}

interface RenderAppResult {
  renderResult: RenderResult;
  stores: StoreType;
  history: MemoryHistory;
}

const renderApp = (options: RenderAppOptions): RenderAppResult => {
  const {
    isAuthenticated,
    initialRoute,
    backFromAuthRedirect,
    initialStoreAuthenticated,
  } = options;

  const onAuthStateChangedSpy = jest.spyOn(
    FirebaseAuth.prototype,
    'onAuthStateChanged'
  );
  const onSubscribeMock = jest.fn();
  const getOAuthTokenSpy = jest.spyOn(AuthCookie, 'getOAuthToken');

  if (isAuthenticated) {
    getOAuthTokenSpy.mockReturnValue(AUTH_TOKEN_COOKIE);
    onAuthStateChangedSpy.mockImplementation(
      (callback: (user: User) => void): Unsubscribe => {
        callback(instance(userMock));
        return onSubscribeMock;
      }
    );
  } else {
    onAuthStateChangedSpy.mockImplementation(
      (callback: (user: null) => void): Unsubscribe => {
        callback(null);
        return onSubscribeMock;
      }
    );
  }

  const getRedirectResultSpy = jest.spyOn(
    FirebaseAuth.prototype,
    'getRedirectResult'
  );

  if (backFromAuthRedirect) {
    getRedirectResultSpy.mockResolvedValue({
      currentUser: currentUserFactory(),
      oAuthToken: AUTH_TOKEN_COOKIE,
    });
  } else {
    getRedirectResultSpy.mockResolvedValue(null);
  }

  const storeOptions = initialStoreAuthenticated
    ? {
        auth: { currentUser: currentUserFactory() },
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
      backFromAuthRedirect: false,
    });
    expect(renderResult.queryByTestId(APP_LOADING)).not.toBe(null);
    await wait();
  });

  it('displays the page content is done loading', async (): Promise<void> => {
    const { renderResult } = renderApp({
      initialRoute: RoutePath.Root,
      isAuthenticated: false,
      initialStoreAuthenticated: false,
      backFromAuthRedirect: false,
    });
    await wait((): void => {
      expect(renderResult.queryByTestId(PAGE_CONTENT_TESTID)).not.toBe(null);
    });
  });

  describe('initial user state', (): void => {
    it('login user if user is logged in', async (): Promise<void> => {
      const { stores } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: true,
        initialStoreAuthenticated: false,
        backFromAuthRedirect: false,
      });
      await wait((): void => {
        expect(stores.auth.getCurrentUser()).not.toBe(null);
      });
    });

    it('clear user from store and cookie if not logged in', async (): Promise<
      void
    > => {
      const { stores } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: false,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: true,
      });
      await wait((): void => {
        expect(stores.auth.getCurrentUser()).toBe(null);
        expect(clearAuthCookie).toHaveBeenCalled();
      });
    });
  });

  describe('auth redirect result', (): void => {
    it('logs in user when we redirected from firebase', async (): Promise<
      void
    > => {
      const { stores } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: false,
        backFromAuthRedirect: true,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(stores.auth.getCurrentUser()).not.toBe(null);
        expect(setOAuthToken).toHaveBeenCalled();
      });
    });
  });

  describe('redirects', (): void => {
    it('should redirect to root route when not authenticated in /gh', async (): Promise<
      void
    > => {
      const { history } = renderApp({
        initialRoute: '/gh',
        isAuthenticated: false,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(history.location.pathname).toBe(RoutePath.Root);
      });
    });

    it('should redirect to root route when not authenticated in /gh/route', async (): Promise<
      void
    > => {
      const { history } = renderApp({
        initialRoute: '/gh/route',
        isAuthenticated: false,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(history.location.pathname).toBe(RoutePath.Root);
      });
    });

    it('should not redirect to root route when not authenticated in /gh123', async (): Promise<
      void
    > => {
      const testRoute = '/gh123';
      const { history } = renderApp({
        initialRoute: testRoute,
        isAuthenticated: false,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(history.location.pathname).toBe(testRoute);
      });
    });

    it('should not redirect to root route when not authenticated in /abc123', async (): Promise<
      void
    > => {
      const testRoute = '/abc123';
      const { history } = renderApp({
        initialRoute: testRoute,
        isAuthenticated: false,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(history.location.pathname).toBe(testRoute);
      });
    });

    it('should not redirect to root route when authenticated in /gh', async (): Promise<
      void
    > => {
      const testRoute = '/gh';
      const { history } = renderApp({
        initialRoute: testRoute,
        isAuthenticated: true,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(history.location.pathname).toBe(testRoute);
      });
    });

    it('should not redirect to root route when authenticated in /gh/route', async (): Promise<
      void
    > => {
      const testRoute = '/gh/route';
      const { history } = renderApp({
        initialRoute: testRoute,
        isAuthenticated: true,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(history.location.pathname).toBe(testRoute);
      });
    });

    it('should not redirect to root route when authenticated in /abc123', async (): Promise<
      void
    > => {
      const testRoute = '/abc123';
      const { history } = renderApp({
        initialRoute: testRoute,
        isAuthenticated: true,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(history.location.pathname).toBe(testRoute);
      });
    });
  });

  describe('navbar', (): void => {
    it('displays navbar', async (): Promise<void> => {
      const { renderResult } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: false,
        backFromAuthRedirect: false,
        initialStoreAuthenticated: false,
      });
      await wait((): void => {
        expect(renderResult.queryByTestId(NAVBAR_TESTID)).not.toBe(null);
      });
    });

    describe('signin button', (): void => {
      it('displays signin button when not logged in', async (): Promise<
        void
      > => {
        const { renderResult } = renderApp({
          initialRoute: RoutePath.Root,
          isAuthenticated: false,
          backFromAuthRedirect: false,
          initialStoreAuthenticated: false,
        });
        await wait((): void => {
          expect(renderResult.queryByTestId(NAVBAR_SIGNIN_TESTID)).not.toBe(
            null
          );
        });
      });

      it('displays signin button when logged in at root route', async (): Promise<
        void
      > => {
        const { renderResult } = renderApp({
          initialRoute: RoutePath.Root,
          isAuthenticated: true,
          backFromAuthRedirect: false,
          initialStoreAuthenticated: false,
        });
        await wait((): void => {
          expect(renderResult.queryByTestId(NAVBAR_SIGNIN_TESTID)).not.toBe(
            null
          );
        });
      });

      it('signin button signs in user when pressed', async (): Promise<
        void
      > => {
        const { renderResult } = renderApp({
          initialRoute: RoutePath.Root,
          isAuthenticated: false,
          backFromAuthRedirect: false,
          initialStoreAuthenticated: false,
        });
        await wait((): void => {
          const signIn = renderResult.getByTestId(NAVBAR_SIGNIN_TESTID);
          const signInButton = within(signIn).getByTestId(BUTTON_TESTID);

          fireEvent.click(signInButton);

          expect(handleSignIn).toHaveBeenCalled();
        });
      });
    });

    describe('logout button', (): void => {
      it('displays logout button when logged at github app route', async (): Promise<
        void
      > => {
        const { renderResult } = renderApp({
          initialRoute: GithubRoutePath.AppRoot,
          isAuthenticated: true,
          backFromAuthRedirect: false,
          initialStoreAuthenticated: false,
        });
        await wait((): void => {
          expect(renderResult.queryByTestId(NAVBAR_SIGN_OUT_TESTID)).not.toBe(
            null
          );
        });
      });

      it('logout button logs out user when pressed', async (): Promise<
        void
      > => {
        const { renderResult, history } = renderApp({
          initialRoute: GithubRoutePath.AppRoot,
          isAuthenticated: true,
          backFromAuthRedirect: false,
          initialStoreAuthenticated: false,
        });

        await wait((): void => {
          const signOut = renderResult.getByTestId(NAVBAR_SIGN_OUT_TESTID);
          const signOutButton = within(signOut).getByTestId(BUTTON_TESTID);
          fireEvent.click(signOutButton);
        });

        await wait((): void => {
          expect(FirebaseAuth.prototype.signOut).toHaveBeenCalled();
          expect(history.location.pathname).toBe(RoutePath.Root);
        });
      });
    });
  });
});
