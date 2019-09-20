import { FirebaseAuth } from '@web/lib/firebase/auth';
import { handleSignIn } from '@web/lib/eventHandlers/auth';

jest.mock('@web/lib/firebase/auth');

describe('handleSignin', (): void => {
  it('calls redirectSignInWithGithub', (): void => {
    handleSignIn();
    expect(FirebaseAuth.prototype.redirectSignInWithGithub).toHaveBeenCalled();
  });
});
