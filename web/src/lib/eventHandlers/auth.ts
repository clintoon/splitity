import { track } from '../analytics/tracking';
import { TrackingEvent } from '../analytics/events';

const handleSignIn = async (): Promise<void> => {
  // TODO(clinton): handle signIn
  track(TrackingEvent.onRedirectToAuthScreen);
};

export { handleSignIn };
