import { useEffect } from 'react';
import { storeUser } from '@web/pages/Auth/storeUser';
import { useStore } from '@web/stores/useStore';

const ToSignInPage = (): null => {
  const store = useStore();
  useEffect((): void => {
    storeUser(store);
  }, []);
  return null;
};

export { ToSignInPage };
