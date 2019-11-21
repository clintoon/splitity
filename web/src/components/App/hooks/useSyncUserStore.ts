import { useEffect, useState } from 'react';
import { User } from 'firebase';

import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { transformFirebaseUser } from '@web/lib/firebase/helpers/auth';
import { getOAuthToken, clearAuthCookie } from '@web/lib/cookie/authCookie';
import { StoreType } from '@web/stores/storeProvider';
import { GithubAPI } from '@web/lib/github/github';

const useSyncUserStore = (store: StoreType): boolean => {
  const [fetchingResult, setFetchingResult] = useState(true);

  useEffect((): (() => void) => {
    const auth = new FirebaseAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user: User | null): void => {
      if (user) {
        const oAuthToken = getOAuthToken();
        if (!oAuthToken) {
          throw Error('Error: logged in but cannot find oAuthToken');
        }

        const githubApi = new GithubAPI();
        githubApi.getAppInstallationId().then((githubInstallationId): void => {
          const currentUser = transformFirebaseUser({ user });
          store.auth.signInUser({ ...currentUser, githubInstallationId });
          setFetchingResult(false);
        });
      } else {
        store.auth.signOutUser();
        clearAuthCookie();
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
