import React from 'react';
import styled from 'styled-components';
import { useStore } from '@web/stores/useStore';
import { SettingsSection } from './SettingsSection';
import { GettingStartedSection } from './GettingStartedSection';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  max-width: 700px;
  flex-basis: 700px;
`;

const GithubDashboard = (): JSX.Element | null => {
  const store = useStore();
  const currentUser = store.auth.getCurrentUser();

  if (!currentUser) {
    return null;
  }
  const { githubInstallationId } = currentUser;

  return (
    <Container>
      <Content>
        <SettingsSection installationId={githubInstallationId} />
        <GettingStartedSection />
      </Content>
    </Container>
  );
};

export { GithubDashboard };
