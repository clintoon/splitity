import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { track } from '../analytics/tracking';
import { TrackingEvent } from '../analytics/events';

const handleSignIn = async (): Promise<void> => {
  const auth = new FirebaseAuth(firebaseApp);
  track(TrackingEvent.onRedirectToAuthScreen);
  auth.redirectSignInWithGithub();
};

export { handleSignIn };
