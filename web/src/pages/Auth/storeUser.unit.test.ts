import { storeUser } from '@web/pages/Auth/storeUser';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { mock } from 'ts-mockito';
import { StoreType } from '@web/stores/storeProvider';

jest.mock('@web/lib/firebase/auth');

describe('storeUser', (): void => {
  beforeEach((): void => {
    const storeMock = mock<StoreType>();
    storeUser(storeMock);
  });

  it('calls auth getRedirectResult', (): void => {
    expect(FirebaseAuth.prototype.getRedirectResult).toHaveBeenCalled();
  });
});
