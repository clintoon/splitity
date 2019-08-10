import React from 'react';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { Button, ButtonStyle } from '@web/design/components/Button/Button';

const Navbar = (): JSX.Element => {
  return (
    <DesignNavbar
      rightItems={[
        <Button key="login" styleOf={ButtonStyle.Primary}>
          Login
        </Button>,
      ]}
    />
  );
};

export { Navbar };
