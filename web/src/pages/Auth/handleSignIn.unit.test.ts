import { handleSignIn } from '@web/pages/Auth/handleSignIn';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { mockStoreFactory } from '@web/testing/mockStore';
import { StoreType } from '@web/stores/storeProvider';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import * as authCookie from '@web/lib/cookie/authCookie';

jest.mock('@web/lib/firebase/auth');

const mockCurrentUser = currentUserFactory();

describe('handleSignIn', (): void => {
  let mockStore: StoreType;
  const setOAuthTokenSpy = jest.spyOn(authCookie, 'setOAuthToken');

  beforeEach(
    async (): Promise<void> => {
      mockStore = mockStoreFactory();
      (FirebaseAuth.prototype.getRedirectResult as jest.Mock).mockResolvedValue(
        mockCurrentUser
      );
      await handleSignIn(mockStore);
    }
  );

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it('calls auth getRedirectResult', (): void => {
    expect(FirebaseAuth.prototype.getRedirectResult).toHaveBeenCalled();
  });

  it('signs in the user', (): void => {
    expect(mockStore.auth.getCurrentUser()).toEqual(mockCurrentUser);
  });

  it('sets the oAuthToken in cookie', (): void => {
    expect(setOAuthTokenSpy).toHaveBeenCalled();
  });
});
