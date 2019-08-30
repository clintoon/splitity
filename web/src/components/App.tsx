import React from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/PageContent';
import { useStore } from '@web/stores/useStore';
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

const App: React.FC<{}> = (): JSX.Element => {
  const store = useStore();
  useSyncUserStore(store);

  return (
    <React.Fragment>
      <GlobalStyle />
      <PageContent />
    </React.Fragment>
  );
};

export { App };
