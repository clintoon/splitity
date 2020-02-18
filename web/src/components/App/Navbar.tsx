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
import { handleSignIn } from '@web/lib/eventHandlers/auth';
import { resetTracking } from '@web/lib/analytics/tracking';
import { SplitityLogoButton } from './SplitityLogoButton';

const NAVBAR_SIGNIN_TESTID = 'navbar-signin';
const NAVBAR_SIGN_OUT_TESTID = 'navbar-signout';

const renderNotAuthenticatedNavbar = (): JSX.Element => {
  return (
    <DesignNavbar
      leftItems={[<SplitityLogoButton key="logo" />]}
      rightItems={[
        <div data-testid={NAVBAR_SIGNIN_TESTID} key="login">
          <Button styleOf={ButtonStyle.Primary} onClick={handleSignIn}>
            Login
          </Button>
        </div>,
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
    resetTracking();
    history.push(RoutePath.Root);
  };

  return (
    <DesignNavbar
      leftItems={[<SplitityLogoButton key="logo" />]}
      rightItems={[
        <div data-testid={NAVBAR_SIGN_OUT_TESTID} key="logout">
          <Button styleOf={ButtonStyle.Primary} onClick={handleSignOut}>
            Logout
          </Button>
        </div>,
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

export {
  Navbar,
  WrappedNavbar as NavbarForTest,
  NAVBAR_SIGNIN_TESTID,
  NAVBAR_SIGN_OUT_TESTID,
};
