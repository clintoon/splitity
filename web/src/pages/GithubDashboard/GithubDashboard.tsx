import React from 'react';
import { PullRequestSelection } from './PullRequestSelection';
import { InstallAppNotice } from './InstallAppNotice';
import { useStore } from '@web/stores/useStore';

const GithubDashboard = (): JSX.Element => {
  const store = useStore();
  const currentUser = store.auth.getCurrentUser();
  if (currentUser && currentUser.githubInstallationId) {
    return <PullRequestSelection />;
  }

  return <InstallAppNotice />;
};

export { GithubDashboard };
