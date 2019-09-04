import { useSignInRedirectResult } from '@web/hooks/useSignInRedirectResult';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { mockStoreFactory } from '@web/testing/mockStore';
import { StoreType } from '@web/stores/storeProvider';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import * as authCookie from '@web/lib/cookie/authCookie';
import { History, createMemoryHistory } from 'history';
import { GithubRoutePath, RoutePath } from '@web/constants/routes';
import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

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
  const setOAuthTokenSpy = jest.spyOn(authCookie, 'setOAuthToken');
  let history: History;

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('on success', (): void => {
    beforeEach(
      async (): Promise<void> => {
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
