import React from 'react';
import styled from 'styled-components';
import SplitityLogo from '@web/design/svg/splitity_logo.svg';
import { useHistory } from 'react-router-dom';
import { useStore } from '@web/stores/useStore';
import { RoutePath, GithubRoutePath } from '@web/constants/routes';
import { observer } from 'mobx-react-lite';

const SPLITITY_LOGO_BUTTON_TESTID = 'splitity logo button';

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-width: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const SplitityLogoButton = observer(
  (): JSX.Element => {
    const history = useHistory();
    const store = useStore();

    const onClickHandler = (): void => {
      if (store.auth.isLoggedIn()) {
        history.push(GithubRoutePath.AppRoot);
      } else {
        history.push(RoutePath.Root);
      }
    };

    return (
      <ButtonWrapper
        onClick={onClickHandler}
        data-testid={SPLITITY_LOGO_BUTTON_TESTID}
      >
        <SplitityLogo width="80px" height="40px" />
      </ButtonWrapper>
    );
  }
);

export { SplitityLogoButton, SPLITITY_LOGO_BUTTON_TESTID };
