import React from 'react';
import styled, { css, CSSProp } from 'styled-components';
import { Color } from '@web/design/styles/color';
import { fontFamily } from '@web/design/styles/font';
import {
  BaseButton,
  ButtonSize,
  ButtonStyle,
} from '@web/design/components/Button/internal/BaseButton';
import { noop } from 'lodash';

const BUTTON_TESTID = 'button';

interface ButtonProps {
  children: string;
  size: ButtonSize;
  styleOf: ButtonStyle;
  onClick: (event: React.MouseEvent) => void;
}

interface EnhancedBaseButtonProps {
  styleOf: ButtonStyle;
}

const buttonStyleOfMap = {
  primary: {
    backgroundColor: Color.BlueA200,
    fontColor: Color.Gray900,
  },
  secondary: {
    backgroundColor: Color.Gray300,
    fontColor: Color.Gray900,
  },
};

const EnhancedBaseButton = styled(BaseButton)<EnhancedBaseButtonProps>`
  ${fontFamily};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: none;

  ${({ styleOf }): CSSProp => {
    return css`
      background-color: ${buttonStyleOfMap[styleOf].backgroundColor};
      color: ${buttonStyleOfMap[styleOf].fontColor};
    `;
  }}
`;

const Button = (props: ButtonProps): JSX.Element => {
  const { children } = props;
  return (
    <EnhancedBaseButton data-testid={BUTTON_TESTID} {...props}>
      {children}
    </EnhancedBaseButton>
  );
};

Button.defaultProps = {
  size: ButtonSize.Medium,
  onClick: noop,
};

export { Button, BUTTON_TESTID, ButtonStyle, ButtonProps, ButtonSize };
