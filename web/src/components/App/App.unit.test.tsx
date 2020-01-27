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
import { User, Unsubscribe, UserInfo } from 'firebase';
import { Router } from 'react-router';

import { App, APP_LOADING } from '@web/components/App/App';
import { StoreType } from '@web/stores/storeProvider';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import * as AuthCookie from '@web/lib/cookie/authCookie';
import { RoutePath, GithubRoutePath } from '@web/constants/routes';
import { PAGE_CONTENT_TESTID } from '@web/components/App/PageContent';
import { clearAuthCookie, setOAuthToken } from '@web/lib/cookie/authCookie';
import { NAVBAR_TESTID } from '@web/design/components/Navbar/Navbar';
import { NAVBAR_SIGNIN_TESTID, NAVBAR_SIGN_OUT_TESTID } from './Navbar';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { handleSignIn } from '@web/lib/eventHandlers/auth';
import { GithubAPI } from '@web/lib/github/github';
import { CurrentUser } from '@web/stores/authStore';
import * as Tracking from '@web/lib/analytics/tracking';
import { noop } from 'lodash';
import { TrackingEvent } from '@web/lib/analytics/events';

jest.mock('@web/lib/firebase/auth');
jest.mock('@web/lib/cookie/authCookie');
jest.mock('@web/lib/eventHandlers/auth');
jest.mock('@web/lib/github/github');
jest.mock('@web/lib/analytics/tracking');

const AUTH_TOKEN_COOKIE = 'auth-token-cookie';
const EMAIL = 'clinton@gmail.com';
const EMAIL_VERIFIED = false;
const USER_ID = 123;
const GITHUB_INSTALLATION_ID = 123;
const userMock = mock<User>();
when(userMock.email).thenReturn(EMAIL);
when(userMock.emailVerified).thenReturn(EMAIL_VERIFIED);

const providerDataMock = mock<UserInfo>();
when(providerDataMock.uid).thenReturn(USER_ID.toString());
when(userMock.providerData).thenReturn([instance(providerDataMock)]);

interface RenderAppOptions {
  initialRoute: string;
  initialStoreAuthenticated: boolean;
  isAuthenticated: boolean;
  backFromAuthRedirect: boolean;
  authCookieToken?: string | null;
  githubAppInstalled?: boolean;
  isNewUser?: boolean;
}

interface RenderAppResult {
  renderResult: RenderResult;
  stores: StoreType;
  history: MemoryHistory;
  aliasSpy: jest.SpyInstance;
  identifySpy: jest.SpyInstance;
  trackSpy: jest.SpyInstance;
  resetTrackingSpy: jest.SpyInstance;
}

const currentUserData = {
  email: EMAIL,
  emailVerified: EMAIL_VERIFIED,
  userId: USER_ID,
};

const renderApp = (options: RenderAppOptions): RenderAppResult => {
  const {
    isAuthenticated,
    initialRoute,
    backFromAuthRedirect,
    initialStoreAuthenticated,
    authCookieToken,
    isNewUser,
  } = options;

  const aliasSpy = jest.spyOn(Tracking, 'alias').mockImplementation(noop);
  const identifySpy = jest.spyOn(Tracking, 'identify').mockImplementation(noop);
  const trackSpy = jest.spyOn(Tracking, 'track').mockImplementation(noop);
  const resetTrackingSpy = jest
    .spyOn(Tracking, 'resetTracking')
    .mockImplementation(noop);

  const onAuthStateChangedSpy = jest.spyOn(
    FirebaseAuth.prototype,
    'onAuthStateChanged'
  );
  const onSubscribeMock = jest.fn();
  const getOAuthTokenSpy = jest.spyOn(AuthCookie, 'getOAuthToken');

  if (isAuthenticated) {
    // If we pass in null, then the authToken is not set.
    getOAuthTokenSpy.mockReturnValue(
      authCookieToken === null ? undefined : AUTH_TOKEN_COOKIE
    );
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
      currentUser: currentUserData,
      oAuthToken: AUTH_TOKEN_COOKIE,
      isNewUser: Boolean(isNewUser),
    });
  } else {
    getRedirectResultSpy.mockResolvedValue(null);
  }

  const githubInstallationId = options.githubAppInstalled
    ? GITHUB_INSTALLATION_ID
    : null;

  jest
    .spyOn(GithubAPI.prototype, 'getAppInstallationId')
    .mockResolvedValue(githubInstallationId);

  const storeOptions = initialStoreAuthenticated
    ? {
        auth: {
          currentUser: {
            ...currentUserData,
            githubInstallationId,
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
    aliasSpy,
    identifySpy,
    trackSpy,
    resetTrackingSpy,
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

    it('throw error when user is logged in but authCookie is not set', async (): Promise<
      void
    > => {
      // Mocking logError to not dump error to console
      const consoleErrSpy = jest.spyOn(console, 'error');
      consoleErrSpy.mockImplementation((): void => {});

      const toThrow = async (): Promise<void> => {
        renderApp({
          initialRoute: RoutePath.Root,
          isAuthenticated: true,
          backFromAuthRedirect: false,
          initialStoreAuthenticated: false,
          authCookieToken: null,
        });
        await wait();
      };

      await expect(toThrow()).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Error: logged in but cannot find oAuthToken"`
      );

      consoleErrSpy.mockRestore();
    });

    it('stores githubInstallationId into store when user installed app', async (): Promise<
      void
    > => {
      const { stores } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: true,
        initialStoreAuthenticated: false,
        backFromAuthRedirect: false,
        githubAppInstalled: true,
      });
      await wait((): void => {
        const currentUser = stores.auth.getCurrentUser();
        expect((currentUser as CurrentUser).githubInstallationId).toBe(
          GITHUB_INSTALLATION_ID
        );
      });
    });

    it('githubInstallationId is null when user has not installed github app', async (): Promise<
      void
    > => {
      const { stores } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: true,
        initialStoreAuthenticated: false,
        backFromAuthRedirect: false,
        githubAppInstalled: false,
      });
      await wait((): void => {
        const currentUser = stores.auth.getCurrentUser();
        expect((currentUser as CurrentUser).githubInstallationId).toBe(null);
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

    it('stores githubInstallationId when user has installed github app', async (): Promise<
      void
    > => {
      const { stores } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: false,
        backFromAuthRedirect: true,
        initialStoreAuthenticated: false,
        githubAppInstalled: true,
      });
      await wait((): void => {
        const currentUser = stores.auth.getCurrentUser();
        expect((currentUser as CurrentUser).githubInstallationId).toBe(
          GITHUB_INSTALLATION_ID
        );
      });
    });

    it('githubInstallationId is null when user has not installed github app', async (): Promise<
      void
    > => {
      const { stores } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: false,
        backFromAuthRedirect: true,
        initialStoreAuthenticated: false,
        githubAppInstalled: false,
      });
      await wait((): void => {
        const currentUser = stores.auth.getCurrentUser();
        expect((currentUser as CurrentUser).githubInstallationId).toBe(null);
      });
    });

    it('calls alias when is new user', async (): Promise<void> => {
      const { aliasSpy } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: false,
        backFromAuthRedirect: true,
        initialStoreAuthenticated: false,
        githubAppInstalled: false,
        isNewUser: true,
      });
      await wait((): void => {
        expect(aliasSpy).toBeCalled();
      });
    });

    it('calls track "sign_up" when is new user', async (): Promise<void> => {
      const { trackSpy } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: false,
        backFromAuthRedirect: true,
        initialStoreAuthenticated: false,
        githubAppInstalled: false,
        isNewUser: true,
      });
      await wait((): void => {
        expect(trackSpy).toBeCalledWith(TrackingEvent.signUpCompleted);
      });
    });

    it('calls identify when is not new user', async (): Promise<void> => {
      const { identifySpy } = renderApp({
        initialRoute: RoutePath.Root,
        isAuthenticated: false,
        backFromAuthRedirect: true,
        initialStoreAuthenticated: false,
        githubAppInstalled: false,
        isNewUser: false,
      });
      await wait((): void => {
        expect(identifySpy).toBeCalled();
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

    it('logout button calls reset tracking when pressed', async (): Promise<
      void
    > => {
      const { renderResult, resetTrackingSpy } = renderApp({
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
        expect(resetTrackingSpy).toBeCalled();
      });
    });
  });
});
