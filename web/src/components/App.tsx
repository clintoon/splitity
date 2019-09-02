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
import { History } from 'history';
import { withRouter, RouteComponentProps } from 'react-router';
import { RoutePath, GithubRoutePath } from '@web/constants/routes';
import { handleSignIn } from '@web/pages/Auth/handleSignIn';

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

const useUpdateNotAuthenticated = (
  store: StoreType,
  history: History
): void => {
  useEffect((): (() => void) => {
    const auth = new FirebaseAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user: User | null): void => {
      if (!user) {
        store.auth.signOutUser();
        clearAuthCookie();
        // Redirect to homepage when in github app routes
        const path = history.location.pathname;
        if (
          path.match(new RegExp(`^\\${GithubRoutePath.AppRoot}$\/`)) ||
          path.match(new RegExp(`^\\${GithubRoutePath.AppRoot}\/*$`))
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

const WrappedApp = ({ history }: RouteComponentProps): JSX.Element | null => {
  const store = useStore();
  useSyncUserStore(store);
  useUpdateNotAuthenticated(store, history);
  const fetchingRedirectResult = handleSignIn(store, history);
  console.log('app', fetchingRedirectResult);
  if (fetchingRedirectResult) {
    return null;
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <PageContent />
    </React.Fragment>
  );
};

const App = withRouter(WrappedApp);

export { App, WrappedApp as AppForTest };
