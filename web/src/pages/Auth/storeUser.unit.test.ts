import { storeUser } from '@web/pages/Auth/storeUser';
import { FirebaseAuth } from '@web/lib/firebase/auth';

jest.mock('@web/lib/firebase/auth');

describe('storeUser', (): void => {
  beforeEach((): void => {
    storeUser();
  });

  it('calls auth getRedirectResult', (): void => {
    expect(FirebaseAuth.prototype.getRedirectResult).toHaveBeenCalled();
  });
});
