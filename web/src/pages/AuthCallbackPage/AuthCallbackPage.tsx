import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { GithubRoutePath } from '@web/constants/routes';
import queryString from 'query-string';
import { BackendAPI } from '@web/lib/backend/backendApi';
import { useStore } from '@web/stores/useStore';
import { setOAuthToken, getOAuthToken } from '@web/lib/cookie/authCookie';
import { SessionStorageItem } from '@web/lib/window/constants';
import { getSessionStorageItem } from '@web/lib/window/window';
import { identify, alias } from '@web/lib/analytics/tracking';

// TODO(clinton): Write unit tests for this component
const AuthCallbackPage = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
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
      setOAuthToken(accessToken);

      console.log('access token 1:', accessToken);
      console.log('access token 2:', getOAuthToken());

      // Set current user store
      try {
        const currentUser = await backend.getCurrentUser();
        store.auth.signInUser(currentUser);

        console.log('currentUser', currentUser);

        const currentUserId = currentUser.userId.toString();
        if (isNewUser) {
          alias(currentUserId);
        } else {
          identify(currentUserId);
        }

        history.replace(GithubRoutePath.AppRoot);
      } catch (error) {
        console.log('caught error: ', error);
      }
    };

    loginUser();
  }, []);

  return <div>Loading...</div>;
};

export { AuthCallbackPage };
