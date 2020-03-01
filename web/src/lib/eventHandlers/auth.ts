import { track, resetTracking } from '../analytics/tracking';
import { TrackingEvent } from '../analytics/events';
import { v4 as uuidv4 } from 'uuid';
import { githubConfig } from '@web/config/github';
import { clearAuthCookie } from '../cookie/authCookie';
import { StoreType } from '@web/stores/storeProvider';

const handleSignIn = async (): Promise<void> => {
  track(TrackingEvent.onRedirectToAuthScreen);

  const state = uuidv4();
  window.sessionStorage.setItem('auth_state', state);
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubConfig.githubAppClientId}&state=${state}`;
};

const handleSignOut = (store: StoreType): void => {
  clearAuthCookie();
  store.auth.signOutUser();
  resetTracking();
};

export { handleSignIn, handleSignOut };
