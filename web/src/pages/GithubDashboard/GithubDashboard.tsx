import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from '@web/stores/useStore';
import { SettingsSection } from './SettingsSection';
import { GettingStartedSection } from './GettingStartedSection';
import { GithubAPI } from '@web/lib/github/github';
import { usePromise } from '@web/lib/hooks/usePromise';

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
  const github = new GithubAPI();

  const githubInstallationId = usePromise(
    github.getAppInstallationId(githubUserId),
    null
  );

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
