import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { GithubRoutePath } from '@web/constants/routes';
import queryString from 'query-string';
import { BackendAPI } from '@web/lib/backend/backendApi';
import { useStore } from '@web/stores/useStore';
import { setOAuthToken } from '@web/lib/cookie/authCookie';

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
      const storedState = window.sessionStorage.getItem('auth_state');
      if (storedState !== parsed.state) {
        throw Error('AuthCallbackPage error: state does not match');
      }

      // Call the backend to log in and store token in cookie
      let backend = new BackendAPI();
      const { accessToken } = await backend.login({ code });
      setOAuthToken(accessToken);

      // Set current user store
      const currentUser = await backend.getCurrentUser();
      store.auth.signInUser(currentUser);

      // TODO(clinton): Sort out tracking here

      history.replace(GithubRoutePath.AppRoot);
    };

    loginUser();
  });

  return <div>Loading...</div>;
};

export { AuthCallbackPage };
