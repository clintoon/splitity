import React from 'react';
// import styled from 'styled-components';

const INSTALL_APP_NOTICE_TESTID = 'install app notice';

const InstallAppNotice = (): JSX.Element => {
  return <div data-testid={INSTALL_APP_NOTICE_TESTID}>Install app</div>;
};

export { InstallAppNotice, INSTALL_APP_NOTICE_TESTID };
