import { useEffect } from 'react';
import { User } from 'firebase';

import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { transformFirebaseUser } from '@web/lib/firebase/helpers/auth';
import { getOAuthToken, clearAuthCookie } from '@web/lib/cookie/authCookie';
import { StoreType } from '@web/stores/storeProvider';
import { GithubAPI } from '@web/lib/github/github';

const useSyncUserStore = (store: StoreType): void => {
  useEffect((): (() => void) => {
    const auth = new FirebaseAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged(
      async (user: User | null): Promise<void> => {
        if (user) {
          const oAuthToken = getOAuthToken();
          if (!oAuthToken) {
            throw Error('Error: logged in but cannot find oAuthToken');
          }

          // const githubApi = new GithubAPI();
          // const githubInstallationId = await githubApi.getAppInstallationId();
          const githubInstallationId = null;

          const currentUser = transformFirebaseUser({ user });

          store.auth.signInUser({ ...currentUser, githubInstallationId });
        } else {
          store.auth.signOutUser();
          clearAuthCookie();
        }
      }
    );

    return (): void => {
      unsubscribe();
    };
  }, []);
};

export { useSyncUserStore };
