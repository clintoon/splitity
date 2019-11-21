import React from 'react';
import { PullRequestSelection } from './PullRequestSelection';
import { InstallAppNotice } from './InstallAppNotice';

const GithubDashboard = (): JSX.Element => {
  // TODO(clinton): Change true to be whether app is installed or not
  if (true) {
    return <PullRequestSelection />;
  }

  return <InstallAppNotice />;
};

export { GithubDashboard };
