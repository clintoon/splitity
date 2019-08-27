import { storeUser } from '@web/pages/Auth/storeUser';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { mockStoreFactory } from '@web/testing/mockStore';
import { StoreType } from '@web/stores/storeProvider';
import { currentUserFactory } from '@web/testing/mockCurrentUser';

jest.mock('@web/lib/firebase/auth');

const mockCurrentUser = currentUserFactory();

describe('storeUser', (): void => {
  let mockStore: StoreType;

  beforeEach(
    async (): Promise<void> => {
      mockStore = mockStoreFactory();
      (FirebaseAuth.prototype.getRedirectResult as jest.Mock).mockResolvedValue(
        mockCurrentUser
      );
      await storeUser(mockStore);
    }
  );

  it('calls auth getRedirectResult', (): void => {
    expect(FirebaseAuth.prototype.getRedirectResult).toHaveBeenCalled();
  });

  it('signs in the user', (): void => {
    expect(mockStore.auth.getCurrentUser()).toEqual(mockCurrentUser);
  });
});
