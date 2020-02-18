import React from 'react';
import styled from 'styled-components';
import SplitityLogo from '@web/design/svg/splitity_logo.svg';

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
  return (
    <ButtonWrapper>
      <SplitityLogo width="80px" height="40px" />
    </ButtonWrapper>
  );
};

export { SplitityLogoButton };
