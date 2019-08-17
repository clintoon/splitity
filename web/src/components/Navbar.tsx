import React from 'react';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { Button, ButtonStyle } from '@web/design/components/Button/Button';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { RoutePath } from '@web/constants/routes';

// TODO: if logged in display don't display login button
const WrappedNavbar = ({ history }: RouteComponentProps): JSX.Element => {
  const signIn = (): void => {
    const auth = new FirebaseAuth(firebaseApp);
    history.push(RoutePath.AuthToSignInRoute);
    auth.redirectSignInWithGithub();
  };

  return (
    <DesignNavbar
      rightItems={[
        <Button
          key="login"
          styleOf={ButtonStyle.Primary}
          onClick={(): void => signIn()}
        >
          Login
        </Button>,
      ]}
    />
  );
};

const Navbar = withRouter(WrappedNavbar);

export { Navbar, WrappedNavbar };
