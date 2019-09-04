import React from 'react';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { Button, ButtonStyle } from '@web/design/components/Button/Button';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { RoutePath } from '@web/constants/routes';
import { useStore } from '@web/stores/useStore';
import { observer } from 'mobx-react-lite';

const renderNotAuthenticatedNavbar = (): JSX.Element => {
  const handleSignIn = async (): Promise<void> => {
    const auth = new FirebaseAuth(firebaseApp);
    auth.redirectSignInWithGithub();
  };

  return (
    <DesignNavbar
      rightItems={[
        <Button
          key="login"
          styleOf={ButtonStyle.Primary}
          onClick={handleSignIn}
        >
          Login
        </Button>,
      ]}
    />
  );
};

const renderAuthenticatedNavbar = (history: History): JSX.Element => {
  const handleSignOut = async (): Promise<void> => {
    const auth = new FirebaseAuth(firebaseApp);
    // This triggers the useUpdateNotAuthenticated hook
    // which will clear the cookies and store
    await auth.signOut();
    history.push(RoutePath.Root);
  };

  return (
    <DesignNavbar
      rightItems={[
        <Button
          key="logout"
          styleOf={ButtonStyle.Primary}
          onClick={handleSignOut}
        >
          Logout
        </Button>,
      ]}
    />
  );
};

const WrappedNavbar = observer(
  ({ history, location }: RouteComponentProps): JSX.Element => {
    const store = useStore();
    if (store.auth.isLoggedIn() && location.pathname !== RoutePath.Root) {
      return renderAuthenticatedNavbar(history);
    } else {
      return renderNotAuthenticatedNavbar();
    }
  }
);

const Navbar = withRouter(WrappedNavbar);

export { Navbar, WrappedNavbar as NavbarForTest };
