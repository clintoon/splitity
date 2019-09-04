import { useEffect } from 'react';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { User } from 'firebase';
import { transformFirebaseUser } from '@web/lib/firebase/helpers/auth';
import { getOAuthToken, clearAuthCookie } from '@web/lib/cookie/authCookie';
import { StoreType } from '@web/stores/storeProvider';

const useSyncUserStore = (store: StoreType): void => {
  useEffect((): (() => void) => {
    const auth = new FirebaseAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user: User | null): void => {
      if (user) {
        const oAuthToken = getOAuthToken();
        const currentUser = transformFirebaseUser({ oAuthToken, user });
        store.auth.signInUser(currentUser);
      } else {
        store.auth.signOutUser();
        clearAuthCookie();
      }
    });

    return (): void => {
      unsubscribe();
    };
  }, []);
};

export { useSyncUserStore };
