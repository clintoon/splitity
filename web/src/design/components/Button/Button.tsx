import React from 'react';
import styled, { css, CSSProp } from 'styled-components';
import PropTypes from 'prop-types';
import { Color } from '@web/design/styles/color';
import { noop } from 'lodash';

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
    padding: '4px',
  },
  m: {
    padding: '8px',
  },
  l: {
    padding: '12px',
  },
};

const buttonStyleOfMap = {
  primary: {
    backgroundColor: Color.Orange,
  },
  secondary: {
    backgroundColor: Color.LightGray,
  },
};

const ButtonBase = styled('button')<ButtonBaseProps>`
  border-radius: 4px;

  ${({ size }): CSSProp => {
    return css`
      padding: ${buttonSizeMap[size].padding};
    `;
  }}

  ${({ styleOf }): CSSProp => {
    return css`
      background-color: ${buttonStyleOfMap[styleOf].backgroundColor};
    `;
  }}
`;

const Button = (props: ButtonProps): JSX.Element => {
  const { children } = props;
  return <ButtonBase {...props}>{children}</ButtonBase>;
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.values(ButtonSize)),
};

Button.defaultProps = {
  size: ButtonSize.Medium,
  onClick: noop,
};

export { Button, ButtonBase as ButtonBaseForTest };
