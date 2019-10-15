import { useEffect, useState } from 'react';
import { History } from 'history';

import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { StoreType } from '@web/stores/storeProvider';
import { setOAuthToken } from '@web/lib/cookie/authCookie';
import { GithubRoutePath } from '@web/constants/routes';

const useSignInRedirectResult = (
  store: StoreType,
  history: History
): boolean => {
  // Initially set as fetching, and set as done when getRedirectResult is done
  const [fetchingResult, setFetchingResult] = useState(true);

  useEffect((): void => {
    const getRedirectResult = async (): Promise<void> => {
      const auth = new FirebaseAuth(firebaseApp);
      const result = await auth.getRedirectResult();
      if (result) {
        setOAuthToken(result.oAuthToken);
        store.auth.signInUser(result.currentUser);
        history.push(GithubRoutePath.AppRoot);
      }
      setFetchingResult(false);
    };

    getRedirectResult();
  }, []);

  return fetchingResult;
};

export { useSignInRedirectResult };
