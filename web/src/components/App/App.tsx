import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/App/PageContent';
import { useStore } from '@web/stores/useStore';
import { BackendAPI } from '@web/lib/backend/backendApi';
import { handleSignOut } from '@web/lib/eventHandlers/auth';
import { identify } from '@web/lib/analytics/tracking';
import { getOAuthToken } from '@web/lib/cookie/authCookie';

const APP_LOADING = 'app-loading';

const App = (): JSX.Element => {
  const store = useStore();
  const [loading, setLoading] = useState(true);

  // Fetch current user data and store in mobx
  useEffect((): void => {
    const loadCurrentUser = async (): Promise<void> => {
      const backend = new BackendAPI();
      try {
        if (getOAuthToken()) {
          const currentUser = await backend.getCurrentUser();
          store.auth.signInUser(currentUser);
          identify(currentUser.userId.toString());
        } else {
          handleSignOut(store);
        }
      } catch (error) {
        if (error.response.status === 401) {
          handleSignOut(store);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  });

  if (loading) {
    return <div data-testid={APP_LOADING}>loading...</div>;
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <PageContent />
    </React.Fragment>
  );
};

export { App, APP_LOADING };
