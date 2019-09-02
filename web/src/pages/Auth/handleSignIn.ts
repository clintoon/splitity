import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { StoreType } from '@web/stores/storeProvider';
import { setOAuthToken } from '@web/lib/cookie/authCookie';

const handleSignIn = async (store: StoreType): Promise<void> => {
  const auth = new FirebaseAuth(firebaseApp);
  const result = await auth.getRedirectResult();
  if (result) {
    setOAuthToken(result.oAuthToken);
    store.auth.signInUser(result);
  }
};

export { handleSignIn };
