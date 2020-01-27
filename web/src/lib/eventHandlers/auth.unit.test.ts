import { FirebaseAuth } from '@web/lib/firebase/auth';
import { handleSignIn } from '@web/lib/eventHandlers/auth';
import { track } from '@web/lib/analytics/tracking';
import { TrackingEvent } from '../analytics/events';

jest.mock('@web/lib/firebase/auth');
jest.mock('@web/lib/analytics/tracking');

describe('handleSignin', (): void => {
  it('calls redirectSignInWithGithub', (): void => {
    handleSignIn();
    expect(FirebaseAuth.prototype.redirectSignInWithGithub).toHaveBeenCalled();
  });

  it('calls onRedirectToAuthScreen tracking event', (): void => {
    handleSignIn();
    expect(track).toHaveBeenCalledWith(TrackingEvent.onRedirectToAuthScreen);
  });
});
