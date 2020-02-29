import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from '@web/stores/useStore';
import { SettingsSection } from './SettingsSection';
import { GettingStartedSection } from './GettingStartedSection';
import { usePromise } from '@web/lib/hooks/usePromise';
import { BackendAPI } from '@web/lib/backend/backendApi';

const GITHUB_DASHBOARD_PAGE_TESTID = 'github dashboard page';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  flex-basis: 700px;
  margin: 0 20px;
`;

const useFetchGithubInstallationId = (githubUserId: number): number | null => {
  const backend = new BackendAPI();

  const fetchAppInstallationId = async (): Promise<number | null> => {
    const installations = await backend.getGithubAppInstallations();

    // Filters to only get the installation that is owned by current user
    const userInstallations = installations.filter((installation): boolean => {
      return installation.account_id === githubUserId;
    });
    if (userInstallations.length === 0) {
      return null;
    }

    return userInstallations[0].github_app_id;
  };

  // TODO(clinton): optimize this. This is called multiple times
  const githubInstallationId = usePromise(fetchAppInstallationId(), null);
  return githubInstallationId ?? null;
};

const GithubDashboard = (): JSX.Element | null => {
  const store = useStore();
  const currentUser = store.auth.getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const githubInstallationId = useFetchGithubInstallationId(currentUser.userId);

  return (
    <Container data-testid={GITHUB_DASHBOARD_PAGE_TESTID}>
      <Content>
        <SettingsSection installationId={githubInstallationId} />
        <GettingStartedSection />
      </Content>
    </Container>
  );
};

export { GithubDashboard, GITHUB_DASHBOARD_PAGE_TESTID };
