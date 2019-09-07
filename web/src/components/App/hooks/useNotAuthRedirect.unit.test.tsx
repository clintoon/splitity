import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { mock, when, instance } from 'ts-mockito';
import { User, Unsubscribe } from 'firebase';
import { History, createMemoryHistory } from 'history';

import { StoreType } from '@web/stores/storeProvider';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { mockStoreFactory } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import { RoutePath } from '@web/constants/routes';
import { useNotAuthRedirect } from '@web/components/App/hooks/useNotAuthRedirect';

jest.mock('@web/lib/firebase/auth');

interface TestComponentProps {
  stores: StoreType;
  history: History;
}

const TestComponent = ({
  stores,
  history,
}: TestComponentProps): JSX.Element => {
  useNotAuthRedirect(stores, history);
  return <div />;
};

interface SetUpOptions {
  isLoggedIn: boolean;
  initialRoute: string;
}

interface SetUpResult {
  history: History;
  stores: StoreType;
  wrapper: ReactWrapper;
}

const setUp = ({ isLoggedIn, initialRoute }: SetUpOptions): SetUpResult => {
  const initialStore = isLoggedIn
    ? { auth: { currentUser: currentUserFactory() } }
    : {};

  const history = createMemoryHistory({ initialEntries: [initialRoute] });
  const stores = mockStoreFactory(initialStore);
  const wrapper = mount(<TestComponent stores={stores} history={history} />);
  return {
    history,
    stores,
    wrapper,
  };
};

describe('redirects', (): void => {
  let onAuthStateChangedMock: jest.Mock;
  let unsubscribeMock: jest.Mock;

  beforeEach((): void => {
    unsubscribeMock = jest.fn();

    onAuthStateChangedMock = FirebaseAuth.prototype
      .onAuthStateChanged as jest.Mock;
    onAuthStateChangedMock.mockReturnValue(unsubscribeMock);
  });

  it('calls unsubscribe at dismount', (): void => {
    const { wrapper } = setUp({ isLoggedIn: true, initialRoute: '/' });
    wrapper.unmount();
    expect(unsubscribeMock).toHaveBeenCalled();
  });

  describe('not authenticated', (): void => {
    beforeEach((): void => {
      onAuthStateChangedMock.mockImplementation(
        (callback: () => void): Unsubscribe => {
          callback();
          return unsubscribeMock;
        }
      );
    });

    it('does not redirect to homepage is /route', (): void => {
      const route = '/route';
      const { history } = setUp({ isLoggedIn: false, initialRoute: route });
      expect(history.location.pathname).toBe(route);
    });

    it('does not redirect to homepage is /gh123', (): void => {
      const route = '/gh123';
      const { history } = setUp({ isLoggedIn: false, initialRoute: route });
      expect(history.location.pathname).toBe(route);
    });

    it('does redirect to homepage is /gh', (): void => {
      const route = '/gh';
      const { history } = setUp({ isLoggedIn: false, initialRoute: route });
      expect(history.location.pathname).toBe(RoutePath.Root);
    });

    it('does redirect to homepage is /gh/', (): void => {
      const route = '/gh/';
      const { history } = setUp({ isLoggedIn: false, initialRoute: route });
      expect(history.location.pathname).toBe(RoutePath.Root);
    });

    it('does redirect to homepage is /gh/route', (): void => {
      const route = '/gh/route';
      const { history } = setUp({ isLoggedIn: false, initialRoute: route });
      expect(history.location.pathname).toBe(RoutePath.Root);
    });
  });

  describe('authenticated', (): void => {
    beforeEach((): void => {
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
    });

    it('does not redirect to homepage is /gh/route', (): void => {
      const route = '/gh/route';
      const { history } = setUp({ isLoggedIn: true, initialRoute: route });
      expect(history.location.pathname).toBe(route);
    });

    it('does not redirect to homepage is /gh', (): void => {
      const route = '/gh';
      const { history } = setUp({ isLoggedIn: true, initialRoute: route });
      expect(history.location.pathname).toBe(route);
    });

    it('does not redirect to homepage is /gh/', (): void => {
      const route = '/gh/';
      const { history } = setUp({ isLoggedIn: true, initialRoute: route });
      expect(history.location.pathname).toBe(route);
    });

    it('does not redirect to homepage is /route', (): void => {
      const route = '/route';
      const { history } = setUp({ isLoggedIn: true, initialRoute: route });
      expect(history.location.pathname).toBe(route);
    });
  });
});
