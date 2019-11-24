import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';
import { Text, TextStyle, TextAlign } from '@web/design/components/Text/Text';
import {
  Button,
  ButtonStyle,
  ButtonSize,
} from '@web/design/components/Button/Button';
import { onInstallGithubApp } from '@web/lib/actions/openPage';

const INSTALL_APP_NOTICE_TESTID = 'install app notice';

const Container = styled.div`
  display: flex;
  margin: 100px 0 0 0;
  justify-content: center;
`;

const Box = styled.div`
  background: ${Color.White};
  max-width: 450px;
  flex-basis: 450px;
  height: 250px;
  border: 1px solid ${Color.DarkGray};
  border-radius: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 0 0;
`;

const InstallAppNotice = (): JSX.Element => {
  return (
    <Container data-testid={INSTALL_APP_NOTICE_TESTID}>
      <Box>
        <Text
          styleOf={TextStyle.Title2}
          margin="30px 30px 0 30px"
          textAlign={TextAlign.Center}
          color={Color.DarkGray}
        >
          Install the Github App to get started
        </Text>
        <ButtonWrapper>
          <Button
            styleOf={ButtonStyle.Primary}
            size={ButtonSize.Large}
            onClick={onInstallGithubApp}
          >
            Install app
          </Button>
        </ButtonWrapper>
      </Box>
    </Container>
  );
};

export { InstallAppNotice, INSTALL_APP_NOTICE_TESTID };
