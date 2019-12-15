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
import { onAddReposClick } from '@web/lib/actions/openPage';

const NAVBAR_SIGNIN_TESTID = 'navbar-signin';
const NAVBAR_SIGN_OUT_TESTID = 'navbar-signout';
const NAVBAR_ADD_REPOS_TESTID = 'navbar-add-repos';

const renderNotAuthenticatedNavbar = (): JSX.Element => {
  return (
    <DesignNavbar
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
  const store = useStore();

  const handleSignOut = async (): Promise<void> => {
    const auth = new FirebaseAuth(firebaseApp);
    // This triggers the useUpdateNotAuthenticated hook
    // which will clear the cookies and store
    await auth.signOut();
    history.push(RoutePath.Root);
  };

  const leftItems = [];
  const githubIntallationId = store.auth.getGithubInstallationId();

  if (githubIntallationId !== null) {
    leftItems.push(
      <div data-testid={NAVBAR_ADD_REPOS_TESTID} key="add-repos">
        <Button
          styleOf={ButtonStyle.Primary}
          onClick={(): void => onAddReposClick(githubIntallationId)}
        >
          Add repos
        </Button>
      </div>
    );
  }

  return (
    <DesignNavbar
      leftItems={leftItems}
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
  NAVBAR_ADD_REPOS_TESTID,
};
