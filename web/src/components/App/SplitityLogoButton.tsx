import React from 'react';
import styled from 'styled-components';
import SplitityLogo from '@web/design/svg/splitity_logo.svg';
import { useHistory } from 'react-router-dom';
import { useStore } from '@web/stores/useStore';
import { RoutePath, GithubRoutePath } from '@web/constants/routes';

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-width: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const SplitityLogoButton = (): JSX.Element => {
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
    <ButtonWrapper onClick={onClickHandler}>
      <SplitityLogo width="80px" height="40px" />
    </ButtonWrapper>
  );
};

export { SplitityLogoButton };
