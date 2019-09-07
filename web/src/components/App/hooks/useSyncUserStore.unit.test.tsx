import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { mock, when, instance } from 'ts-mockito';
import { User, Unsubscribe } from 'firebase';

import { StoreType } from '@web/stores/storeProvider';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import * as authCookie from '@web/lib/cookie/authCookie';
import { mockStoreFactory } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { useSyncUserStore } from '@web/components/App/hooks/useSyncUserStore';

jest.mock('@web/lib/firebase/auth');

interface TestComponentProps {
  stores: StoreType;
}

const TestComponent = ({ stores }: TestComponentProps): JSX.Element => {
  useSyncUserStore(stores);
  return <div />;
};

describe('useSyncUserStore', (): void => {
  let stores: StoreType;
  let wrapper: ReactWrapper;
  let unsubscribeMock: jest.Mock;
  const mockOAuthToken = 'authToken';
  let clearCookieSpy: jest.SpyInstance;
  let onAuthStateChangedMock: jest.Mock;

  beforeEach((): void => {
    unsubscribeMock = jest.fn();

    onAuthStateChangedMock = FirebaseAuth.prototype
      .onAuthStateChanged as jest.Mock;
    onAuthStateChangedMock.mockReturnValue(unsubscribeMock);

    clearCookieSpy = jest.spyOn(authCookie, 'clearAuthCookie');

    jest.spyOn(authCookie, 'getOAuthToken').mockReturnValue(mockOAuthToken);

    stores = mockStoreFactory();
    wrapper = mount(<TestComponent stores={stores} />);
  });

  afterEach((): void => {
    jest.resetAllMocks();
  });

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

    it('removes user from store and clear cookie if passed null', (): void => {
      const user = currentUserFactory();
      const signedInStore = mockStoreFactory({
        auth: {
          currentUser: user,
        },
      });
      wrapper.setProps({ stores: signedInStore });

      onAuthStateChangedMock.mockImplementation(
        (callback: () => void): Unsubscribe => {
          callback();
          return unsubscribeMock;
        }
      );

      wrapper.unmount();
      jest.clearAllMocks();
      wrapper.mount();

      expect(signedInStore.auth.getCurrentUser()).toBe(null);
      expect(clearCookieSpy).toHaveBeenCalled();
    });
  });
});
