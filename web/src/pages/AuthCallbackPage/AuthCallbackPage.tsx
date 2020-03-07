import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { GithubRoutePath } from '@web/constants/routes';
import queryString from 'query-string';
import { BackendAPI } from '@web/lib/backend/backendApi';
import { useStore } from '@web/stores/useStore';
import { setOAuthToken, getOAuthToken } from '@web/lib/cookie/authCookie';
import { SessionStorageItem } from '@web/lib/window/constants';
import { getSessionStorageItem, setHref } from '@web/lib/window/window';
import { identify, alias } from '@web/lib/analytics/tracking';

// TODO(clinton): Write unit tests for this component
const AuthCallbackPage = (): JSX.Element => {
  const location = useLocation();
  const store = useStore();

  useEffect((): void => {
    const loginUser = async (): Promise<void> => {
      const parsed = queryString.parse(location.search);

      const code = parsed.code;
      if (!code || code instanceof Array) {
        throw new Error(
          'AuthCallbackPage error: token not found or is a array'
        );
      }

      // Check that state hasn't changed
      const storedState = getSessionStorageItem(SessionStorageItem.AuthState);
      if (storedState !== parsed.state) {
        throw Error('AuthCallbackPage error: state does not match');
      }

      // Call the backend to log in and store token in cookie
      let backend = new BackendAPI();
      const { accessToken, isNewUser } = await backend.login({ code });

      // Set current user store
      const currentUser = await backend.getCurrentUser(accessToken);
      store.auth.signInUser(currentUser);

      const currentUserId = currentUser.userId.toString();
      if (isNewUser) {
        alias(currentUserId);
      } else {
        identify(currentUserId);
      }

      // Unable to get cookies without refreshing on iOS chrome and firefox
      // which is why we are not getting the auth token from cookie until we do a
      // full page refresh
      setOAuthToken(accessToken);
      setHref(GithubRoutePath.AppRoot);
    };

    loginUser();
  }, []);

  return <div>Loading...</div>;
};

export { AuthCallbackPage };
