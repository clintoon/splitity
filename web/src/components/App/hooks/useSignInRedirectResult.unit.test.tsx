import React from 'react';
import { act } from 'react-dom/test-utils';
import { ReactWrapper, mount } from 'enzyme';
import { History, createMemoryHistory } from 'history';

import { useSignInRedirectResult } from '@web/components/App/hooks/useSignInRedirectResult';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { mockStoreFactory } from '@web/testing/mockStore';
import { StoreType } from '@web/stores/storeProvider';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import * as authCookie from '@web/lib/cookie/authCookie';
import { GithubRoutePath, RoutePath } from '@web/constants/routes';

jest.mock('@web/lib/firebase/auth');

interface TestComponentProps {
  stores: StoreType;
  history: History;
}

const TestComponent = ({
  stores,
  history,
}: TestComponentProps): JSX.Element => {
  const isFetching = useSignInRedirectResult(stores, history);
  return <div>{isFetching ? 'fetching' : 'fetched'}</div>;
};

// TODO: test that the initial state if isFetching is true
describe('useSignInRedirect', (): void => {
  let wrapper: ReactWrapper;
  const mockCurrentUser = currentUserFactory();
  let mockStore: StoreType;
  let setOAuthTokenSpy: jest.SpyInstance;
  let history: History;

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('on success', (): void => {
    beforeEach(
      async (): Promise<void> => {
        setOAuthTokenSpy = jest.spyOn(authCookie, 'setOAuthToken');
        history = createMemoryHistory({
          initialEntries: [RoutePath.Root],
        });
        mockStore = mockStoreFactory();
        (FirebaseAuth.prototype
          .getRedirectResult as jest.Mock).mockResolvedValue(mockCurrentUser);

        await act(
          async (): Promise<void> => {
            wrapper = mount(
              <TestComponent history={history} stores={mockStore} />
            );
          }
        );
      }
    );

    it('calls auth getRedirectResult', (): void => {
      expect(FirebaseAuth.prototype.getRedirectResult).toHaveBeenCalled();
    });

    it('signs in the user', (): void => {
      expect(mockStore.auth.getCurrentUser()).toEqual(mockCurrentUser);
    });

    it('sets the oAuthToken in cookie', (): void => {
      expect(setOAuthTokenSpy).toHaveBeenCalled();
    });

    it('redirects to github app route', (): void => {
      expect(history.location.pathname).toBe(GithubRoutePath.AppRoot);
    });

    it('fetchingResult is false when hook is completed', (): void => {
      expect(wrapper.find('div').text()).toBe('fetched');
    });
  });

  describe('on failure', (): void => {
    beforeEach(
      async (): Promise<void> => {
        setOAuthTokenSpy = jest.spyOn(authCookie, 'setOAuthToken');

        history = createMemoryHistory({
          initialEntries: [RoutePath.Root],
        });
        mockStore = mockStoreFactory();
        (FirebaseAuth.prototype
          .getRedirectResult as jest.Mock).mockResolvedValue(null);
        await act(
          async (): Promise<void> => {
            wrapper = mount(
              <TestComponent history={history} stores={mockStore} />
            );
          }
        );
      }
    );

    it('does not redirect anywhere', (): void => {
      expect(history.location.pathname).toBe(RoutePath.Root);
    });

    it('not set cookie', (): void => {
      expect(setOAuthTokenSpy).not.toHaveBeenCalled();
    });

    it('does not update store', (): void => {
      expect(mockStore.auth.getCurrentUser()).toBe(null);
    });

    it('fetchingResult is false when hook is completed', (): void => {
      expect(wrapper.find('div').text()).toBe('fetched');
    });
  });
});
