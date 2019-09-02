import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { App, AppForTest } from '@web/components/App';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/PageContent';
import { StoreType } from '@web/stores/storeProvider';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import * as authCookie from '@web/lib/cookie/authCookie';
import { mock, when, instance } from 'ts-mockito';
import { User, Unsubscribe } from 'firebase';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { MemoryRouter } from 'react-router';
import { RoutePath } from '@web/constants/routes';

jest.mock('@web/lib/firebase/auth');

describe('<App />', (): void => {
  let stores: StoreType;
  let wrapper: ReactWrapper;
  const unsubscribeMock = jest.fn();
  const mockOAuthToken = 'authToken';
  const clearCookieSpy = jest.spyOn(authCookie, 'clearAuthCookie');

  const onAuthStateChangedMock = FirebaseAuth.prototype
    .onAuthStateChanged as jest.Mock;

  jest.spyOn(authCookie, 'getOAuthToken').mockReturnValue(mockOAuthToken);

  beforeEach((): void => {
    onAuthStateChangedMock.mockImplementation(
      (callback: () => void): Unsubscribe => {
        callback();
        return unsubscribeMock;
      }
    );
    stores = mockStoreFactory();
    wrapper = mount(
      <MemoryRouter>
        <TestStoreProvider stores={stores}>
          <App />
        </TestStoreProvider>
      </MemoryRouter>
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it('renders <GlobalStyle />', (): void => {
    expect(wrapper.find(GlobalStyle).exists()).toBe(true);
  });

  it('renders <PageContent />', (): void => {
    expect(wrapper.find(PageContent).exists()).toBe(true);
  });

  describe('useSyncUserStore', (): void => {
    it('calls onAuthStateChanged on mount', (): void => {
      expect(onAuthStateChangedMock).toHaveBeenCalled();
    });

    it('calls unsubscribe at dismount', (): void => {
      wrapper.unmount();
      expect(unsubscribeMock).toHaveBeenCalled();
    });

    describe('useSyncUserStore callback', (): void => {
      it('signs in user passed in user object', (): void => {
        const mockEmail = 'clinton@gmail.com';
        const mockEmailVerified = false;
        const mockUserId = 'abc123';
        const userMock = mock<User>();
        when(userMock.email).thenReturn(mockEmail);
        when(userMock.emailVerified).thenReturn(mockEmailVerified);
        when(userMock.uid).thenReturn(mockUserId);

        onAuthStateChangedMock.mockImplementation(
          (callback: (user: User) => void): Unsubscribe => {
            callback(instance(userMock));
            return unsubscribeMock;
          }
        );

        wrapper.unmount();
        jest.clearAllMocks();
        wrapper.mount();

        expect(stores.auth.getCurrentUser()).toEqual({
          email: mockEmail,
          emailVerified: mockEmailVerified,
          userId: mockUserId,
          oAuthToken: mockOAuthToken,
        });
      });
    });
  });

  describe('useUpdateNotAuthenticated', (): void => {
    interface SetupAuthenticatedResult {
      store: StoreType;
      wrapper: ReactWrapper;
    }

    const setupAuthenticated = (
      routePath: string = '/'
    ): SetupAuthenticatedResult => {
      jest.clearAllMocks();
      const user = currentUserFactory();
      const signedInStore = mockStoreFactory({
        auth: {
          currentUser: user,
        },
      });
      const authenticatedWrapper = mount(
        <MemoryRouter initialEntries={[routePath]}>
          <TestStoreProvider stores={signedInStore}>
            <App />
          </TestStoreProvider>
        </MemoryRouter>
      );
      authenticatedWrapper.update();
      return { store: signedInStore, wrapper: authenticatedWrapper };
    };

    it('removes user from store and clear cookie if passed null', (): void => {
      const { store } = setupAuthenticated();
      expect(store.auth.getCurrentUser()).toBe(null);
      expect(clearCookieSpy).toHaveBeenCalled();
    });

    describe('redirects', (): void => {
      it('does not redirect to homepage is /route', (): void => {
        const route = '/route';
        const { wrapper } = setupAuthenticated(route);
        expect(wrapper.find(AppForTest).prop('location').pathname).toBe(route);
      });

      it('does not redirect to homepage is /gh123', (): void => {
        const route = '/git123';
        const { wrapper } = setupAuthenticated(route);
        expect(wrapper.find(AppForTest).prop('location').pathname).toBe(route);
      });

      it('redirects to homepage when is /gh', (): void => {
        const route = '/gh';
        const { wrapper } = setupAuthenticated(route);
        expect(wrapper.find(AppForTest).prop('location').pathname).toBe(
          RoutePath.Root
        );
      });

      it('redirects to homepage when is /gh/route', (): void => {
        const route = '/gh';
        const { wrapper } = setupAuthenticated(route);
        expect(wrapper.find(AppForTest).prop('location').pathname).toBe(
          RoutePath.Root
        );
      });
    });
  });
});
