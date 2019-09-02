import { handleSignIn } from '@web/pages/Auth/handleSignIn';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { mockStoreFactory } from '@web/testing/mockStore';
import { StoreType } from '@web/stores/storeProvider';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import * as authCookie from '@web/lib/cookie/authCookie';
import { History, createMemoryHistory } from 'history';
import {
  GithubRoutePath,
  RoutePath,
  AuthRoutePath,
} from '@web/constants/routes';

jest.mock('@web/lib/firebase/auth');

const mockCurrentUser = currentUserFactory();

describe('handleSignIn', (): void => {
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
          initialEntries: [AuthRoutePath.ToSignIn],
        });
        mockStore = mockStoreFactory();
        (FirebaseAuth.prototype
          .getRedirectResult as jest.Mock).mockResolvedValue(mockCurrentUser);
        await handleSignIn(mockStore, history);
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
  });

  describe('on failure', (): void => {
    beforeEach(
      async (): Promise<void> => {
        history = createMemoryHistory({
          initialEntries: [AuthRoutePath.ToSignIn],
        });
        mockStore = mockStoreFactory();
        (FirebaseAuth.prototype
          .getRedirectResult as jest.Mock).mockResolvedValue(null);
        await handleSignIn(mockStore, history);
      }
    );

    it('does not redirect anywhere', (): void => {
      expect(history.location.pathname).toBe(AuthRoutePath.ToSignIn);
    });

    it('not set cookie', (): void => {
      expect(setOAuthTokenSpy).not.toHaveBeenCalled();
    });

    it('does not update store', (): void => {
      expect(mockStore.auth.getCurrentUser()).toBe(null);
    });
  });
});
