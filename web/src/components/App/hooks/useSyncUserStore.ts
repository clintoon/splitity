import { useEffect, useState } from 'react';
import { User } from 'firebase/app';

import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { transformFirebaseUser } from '@web/lib/firebase/helpers/auth';
import { clearAuthCookie } from '@web/lib/cookie/authCookie';
import { StoreType } from '@web/stores/storeProvider';
import { resetTracking } from '@web/lib/analytics/tracking';

const useSyncUserStore = (store: StoreType): boolean => {
  const [fetchingResult, setFetchingResult] = useState(true);

  useEffect((): (() => void) => {
    const auth = new FirebaseAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user: User | null): void => {
      if (user) {
        const currentUser = transformFirebaseUser({ user });
        store.auth.signInUser({ ...currentUser });
        setFetchingResult(false);
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
