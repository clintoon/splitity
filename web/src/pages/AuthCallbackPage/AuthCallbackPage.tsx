import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { GithubRoutePath } from '@web/constants/routes';
import queryString from 'query-string';
import { BackendAPI } from '@web/lib/backend/backendApi';

const AuthCallbackPage = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();

  useEffect((): void => {
    const parsed = queryString.parse(location.search);

    const token = parsed.token;
    if (!token || token instanceof Array) {
      throw new Error('AuthCallbackPage error: token not found or is a array');
    }

    // Check that state hasn't changed
    const storedState = window.sessionStorage.getItem('oauth_session');
    if (storedState !== parsed.state) {
      throw Error('AuthCallbackPage error: state does not match');
    }

    // Call the backend to log in
    const backend = new BackendAPI();
    backend.login({ token });
    // Fetch user info and put in store
    // TODO

    history.replace(GithubRoutePath.AppRoot);
  });

  return <div>Loading...</div>;
};

export { AuthCallbackPage };