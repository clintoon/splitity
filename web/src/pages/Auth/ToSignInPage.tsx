import { useEffect } from 'react';
import { handleSignIn } from '@web/pages/Auth/handleSignIn';
import { useStore } from '@web/stores/useStore';

const ToSignInPage = (): null => {
  const store = useStore();
  useEffect((): void => {
    handleSignIn(store);
  }, []);
  return null;
};

export { ToSignInPage };
