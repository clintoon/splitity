import { useEffect, useState } from 'react';
import { User } from 'firebase/app';

import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { transformFirebaseUser } from '@web/lib/firebase/helpers/auth';
import { getOAuthToken, clearAuthCookie } from '@web/lib/cookie/authCookie';
import { StoreType } from '@web/stores/storeProvider';
import { GithubAPI } from '@web/lib/github/github';
import { resetTracking } from '@web/lib/analytics/tracking';

const useSyncUserStore = (store: StoreType): boolean => {
  const [fetchingResult, setFetchingResult] = useState(true);

  useEffect((): (() => void) => {
    const auth = new FirebaseAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user: User | null): void => {
      const oAuthToken = getOAuthToken();

      if (user && oAuthToken) {
        const currentUser = transformFirebaseUser({ user });
        const githubApi = new GithubAPI();
        githubApi
          .getAppInstallationId(currentUser.userId)
          .then((githubInstallationId): void => {
            store.auth.signInUser({ ...currentUser, githubInstallationId });
            setFetchingResult(false);
          });
      } else {
        store.auth.signOutUser();
        clearAuthCookie();
        resetTracking();
        setFetchingResult(false);
      }
    });

    return (): void => {
      unsubscribe();
    };
  }, []);

  return fetchingResult;
};

export { useSyncUserStore };
