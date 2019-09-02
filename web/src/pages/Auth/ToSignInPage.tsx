import { useEffect } from 'react';
import { handleSignIn } from '@web/pages/Auth/handleSignIn';
import { useStore } from '@web/stores/useStore';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const WrappedToSignInPage = ({ history }: RouteComponentProps): null => {
  const store = useStore();
  useEffect((): void => {
    handleSignIn(store, history);
  }, []);
  return null;
};

const ToSignInPage = withRouter(WrappedToSignInPage);

export { ToSignInPage, WrappedToSignInPage as ToSignInPageForTest };
