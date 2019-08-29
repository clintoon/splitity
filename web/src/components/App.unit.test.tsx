import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { App } from '@web/components/App';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/PageContent';
import { StoreType } from '@web/stores/storeProvider';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import * as authCookie from '@web/lib/cookie/authCookie';
import { mock, when, instance } from 'ts-mockito';
import { User } from 'firebase';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';

jest.mock('@web/lib/firebase/auth');

describe('<App />', (): void => {
  let stores: StoreType;
  let wrapper: ReactWrapper;
  const unsubscribeMock = jest.fn();
  const mockOAuthToken = 'authToken';
  const clearCookieSpy = jest.spyOn(authCookie, 'clearAuthCookie');

  const onAuthStateChangedMock = FirebaseAuth.prototype
    .onAuthStateChanged as jest.Mock;
  onAuthStateChangedMock.mockReturnValue(unsubscribeMock);

  jest.spyOn(authCookie, 'getOAuthToken').mockReturnValue(mockOAuthToken);

  beforeEach((): void => {
    stores = mockStoreFactory();
    wrapper = mount(
      <TestStoreProvider stores={stores}>
        <App />
      </TestStoreProvider>
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
        const callback: (user: User) => void =
          onAuthStateChangedMock.mock.calls[0][0];

        const mockEmail = 'clinton@gmail.com';
        const mockEmailVerified = false;
        const mockUserId = 'abc123';

        const userMock = mock<User>();
        when(userMock.email).thenReturn(mockEmail);
        when(userMock.emailVerified).thenReturn(mockEmailVerified);
        when(userMock.uid).thenReturn(mockUserId);

        callback(instance(userMock));
        expect(stores.auth.getCurrentUser()).toEqual({
          email: mockEmail,
          emailVerified: mockEmailVerified,
          userId: mockUserId,
          oAuthToken: mockOAuthToken,
        });
      });

      it('removes user from store and clear cookie if passed null', (): void => {
        // setup component
        jest.clearAllMocks();
        const user = currentUserFactory();

        const signedInStore = mockStoreFactory({
          auth: {
            currentUser: user,
          },
        });

        mount(
          <TestStoreProvider stores={signedInStore}>
            <App />
          </TestStoreProvider>
        );

        // begin test
        const callback: (user: null) => void =
          onAuthStateChangedMock.mock.calls[0][0];

        callback(null);

        expect(signedInStore.auth.getCurrentUser()).toBe(null);
        expect(clearCookieSpy).toHaveBeenCalled();
      });
    });
  });
});
