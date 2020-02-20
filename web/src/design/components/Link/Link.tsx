import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { fontFamily } from '@web/design/styles/font';
import { Color } from '@web/design/styles/color';

const LINK_TESTID = 'link';

interface LinkProps {
  to: string;
  children: string;
  color?: string;
}

const StyledLink = styled(RouterLink)<Required<LinkProps>>`
  font-size: 14px;
  ${fontFamily};
  color: ${({ color }): string => color};
`;

const Link = ({ to, color, children }: LinkProps): JSX.Element => {
  return (
    <StyledLink
      data-testid={LINK_TESTID}
      to={to}
      color={color || Color.Blue600}
    >
      {children}
    </StyledLink>
  );
};

export { Link, LINK_TESTID };
