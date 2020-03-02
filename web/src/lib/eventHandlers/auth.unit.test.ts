import { handleSignIn } from '@web/lib/eventHandlers/auth';
import { track } from '@web/lib/analytics/tracking';
import { TrackingEvent } from '../analytics/events';

jest.mock('@web/lib/analytics/tracking');
jest.mock('@web/lib/window/window');

describe('handleSignin', (): void => {
  it('calls tracking event', (): void => {
    handleSignIn();

    expect(track).toBeCalledWith(TrackingEvent.onRedirectToAuthScreen);
  });
});
