import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { StoreType } from '@web/stores/storeProvider';
import { setOAuthToken } from '@web/lib/cookie/authCookie';
import { History } from 'history';
import { GithubRoutePath } from '@web/constants/routes';
import { useEffect, useState } from 'react';

const handleSignIn = (store: StoreType, history: History): boolean => {
  // Initially set as fetching, and set as done when getRedirectResult is done
  const [fetchResult, setFetchResult] = useState(true);

  useEffect((): void => {
    const getRedirectResult = async (): Promise<void> => {
      const auth = new FirebaseAuth(firebaseApp);
      const result = await auth.getRedirectResult();
      if (result) {
        setOAuthToken(result.oAuthToken);
        store.auth.signInUser(result);
        history.push(GithubRoutePath.AppRoot);
      }
      setFetchResult(false);
    };

    getRedirectResult();
  }, []);

  return fetchResult;
};

export { handleSignIn };
