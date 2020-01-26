import React from 'react';
import styled from 'styled-components';
import { Text } from '@web/design/components/Text/Text';
import { Button, ButtonStyle } from '@web/design/components/Button/Button';
import { onInstallGithubApp, onAddReposClick } from '@web/lib/actions/openPage';
import { Color } from '@web/design/styles/color';
import { Card } from '@web/design/components/Card/Card';

const SETTINGS_SECTION_INSTALL_APP_TESTID = 'settings section install app';
const SETTINGS_SECTION_MANAGE_APP_TESTID = 'settings section manage app';

interface SettingsSectionProps {
  installationId: number | null;
}

const Container = styled.div`
  background-color: ${Color.White};
  border-radius: 10px;
  margin: 40px 0;
  flex-grow: 1;
`;

const CardBodyWrapper = styled.div`
  margin: 20px;
`;

const SettingsSection = ({
  installationId,
}: SettingsSectionProps): JSX.Element => {
  if (installationId === null) {
    return (
      <Container data-testid={SETTINGS_SECTION_INSTALL_APP_TESTID}>
        <Card header="Settings">
          <CardBodyWrapper>
            <Text margin="0 0 10px 0">Install the github app</Text>
            <Button styleOf={ButtonStyle.Primary} onClick={onInstallGithubApp}>
              Install
            </Button>
          </CardBodyWrapper>
        </Card>
      </Container>
    );
  }

  return (
    <Container data-testid={SETTINGS_SECTION_MANAGE_APP_TESTID}>
      <Card header="Settings">
        <CardBodyWrapper>
          <Text margin="0 0 10px 0">Manage your github installation</Text>
          <Button
            styleOf={ButtonStyle.Primary}
            onClick={(): void => {
              onAddReposClick(installationId);
            }}
          >
            Configure
          </Button>
        </CardBodyWrapper>
      </Card>
    </Container>
  );
};

export {
  SettingsSection,
  SETTINGS_SECTION_INSTALL_APP_TESTID,
  SETTINGS_SECTION_MANAGE_APP_TESTID,
};
