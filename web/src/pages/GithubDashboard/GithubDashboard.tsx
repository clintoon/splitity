import React from 'react';
import styled from 'styled-components';
import { useStore } from '@web/stores/useStore';
import { SettingsSection } from './SettingsSection';
import { GettingStartedSection } from './GettingStartedSection';

const GITHUB_DASHBOARD_PAGE_TESTID = 'github dashboard page';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  flex-basis: 700px;
  margin: 0 20px;
`;

const GithubDashboard = (): JSX.Element | null => {
  const store = useStore();
  const currentUser = store.auth.getCurrentUser();

  if (!currentUser) {
    return null;
  }
  const { githubInstallationId } = currentUser;

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
