import { useEffect } from 'react';
import { storeUser } from '@web/pages/Auth/storeUser';

const ToSignInPage = (): null => {
  useEffect((): void => {
    storeUser();
  }, []);
  return null;
};

export { ToSignInPage };
