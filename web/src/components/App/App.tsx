import React, { useState } from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/App/PageContent';
import { useStore } from '@web/stores/useStore';
import { withRouter, RouteComponentProps } from 'react-router';
import { useSignInRedirectResult } from '@web/components/App/hooks/useSignInRedirectResult';
import { useSyncUserStore } from '@web/components/App/hooks/useSyncUserStore';
import { getOAuthToken } from '@web/lib/cookie/authCookie';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { observer } from 'mobx-react-lite';

const APP_LOADING = 'app-loading';

const WrappedApp = observer(
  ({ history }: RouteComponentProps): JSX.Element => {
    const displayLoading = <div data-testid={APP_LOADING}>loading...</div>;

    const store = useStore();

    const fetchingUserResult = useSyncUserStore(store);
    const fetchingRedirectResult = useSignInRedirectResult(store, history);

    if (fetchingRedirectResult || fetchingUserResult) {
      return displayLoading;
    }

    // Check if oAuthToken exists if logged in
    if (store.auth.isLoggedIn() && !getOAuthToken()) {
      const firebaseAuth = new FirebaseAuth(firebaseApp);
      firebaseAuth.signOut();
      return displayLoading;
    }

    return (
      <React.Fragment>
        <GlobalStyle />
        <PageContent />
      </React.Fragment>
    );
  }
);

const App = withRouter(WrappedApp);

export { App, WrappedApp as AppForTest, APP_LOADING };
