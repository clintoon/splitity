import React from 'react';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { Button, ButtonStyle } from '@web/design/components/Button/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { RoutePath } from '@web/constants/routes';
import { useStore } from '@web/stores/useStore';
import { handleSignIn } from '@web/lib/eventHandlers/auth';
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
    // TODO(clinton): Add logout
    // This triggers the useUpdateNotAuthenticated hook
    // which will clear the cookies and store
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

const WrappedNavbar = ({
  history,
  location,
}: RouteComponentProps): JSX.Element => {
  const store = useStore();
  if (store.auth.isLoggedIn() && location.pathname !== RoutePath.Root) {
    return renderAuthenticatedNavbar(history);
  } else {
    return renderNotAuthenticatedNavbar();
  }
};

const Navbar = withRouter(WrappedNavbar);

export {
  Navbar,
  WrappedNavbar as NavbarForTest,
  NAVBAR_SIGNIN_TESTID,
  NAVBAR_SIGN_OUT_TESTID,
};
