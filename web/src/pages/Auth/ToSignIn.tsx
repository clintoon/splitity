import { useEffect } from 'react';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';

const ToSignInPage = (): null => {
  useEffect((): void => {
    const storeUser = async (): Promise<void> => {
      const auth = new FirebaseAuth(firebaseApp);
      const result = await auth.getRedirectResult();
      console.log(result.user);
    };
    storeUser();
  }, []);
  return null;
};

export { ToSignInPage };
