import { useEffect } from 'react';
import { History } from 'history';
import { User } from 'firebase';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { clearAuthCookie } from '@web/lib/cookie/authCookie';
import { StoreType } from '@web/stores/storeProvider';
import { RoutePath } from '@web/constants/routes';

const useNotAuthRedirect = (store: StoreType, history: History): void => {
  useEffect((): (() => void) => {
    const auth = new FirebaseAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user: User | null): void => {
      if (!user) {
        store.auth.signOutUser();
        clearAuthCookie();
        // Redirect to homepage when in github app routes
        const path = history.location.pathname;
        if (
          path.toLowerCase().match(/^\/gh$/) ||
          path.toLowerCase().match(/^\/gh\/.*$/)
        ) {
          history.replace(RoutePath.Root);
        }
      }
    });

    return (): void => {
      unsubscribe();
    };
  }, []);
};

export { useNotAuthRedirect };
