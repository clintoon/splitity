import React from 'react';
import styled, { css, CSSProp } from 'styled-components';
import { Color } from '@web/design/styles/color';
import { noop } from 'lodash';
import { fontFamily } from '@web/design/styles/font';

const BUTTON_TESTID = 'button';

export enum ButtonSize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

export enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
}

export interface ButtonProps {
  children: string;
  size: ButtonSize;
  styleOf: ButtonStyle;
  onClick: (event: React.MouseEvent) => void;
}

type ButtonBaseProps = Omit<ButtonProps, 'children'>;

const buttonSizeMap = {
  s: {
    padding: '6px 10px',
  },
  m: {
    padding: '12px 18px',
  },
  l: {
    padding: '18px 26px',
  },
};

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

const ButtonBase = styled('button')<ButtonBaseProps>`
  ${fontFamily};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: none;

  ${({ size }): CSSProp => {
    return css`
      padding: ${buttonSizeMap[size].padding};
    `;
  }}

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
    <ButtonBase data-testid={BUTTON_TESTID} {...props}>
      {children}
    </ButtonBase>
  );
};

Button.defaultProps = {
  size: ButtonSize.Medium,
  onClick: noop,
};

export { Button, ButtonBase as ButtonBaseForTest, BUTTON_TESTID };
