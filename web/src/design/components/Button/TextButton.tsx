import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Color } from '@web/design/styles/color';
import { BaseButton, ButtonSize, ButtonStyle } from './internal/BaseButton';
import { noop } from 'lodash';
import { transparentize } from 'polished';

const TEXT_BUTTON_TESTID = 'text button';

interface TextButtonProps {
  children: string;
  styleOf: ButtonStyle;
  onClick?: () => void;
  size: ButtonSize;
  disabled: boolean;
}

interface EnhancedBaseButtonProps {
  styleOf: ButtonStyle;
}

const buttonStyleMapping = {
  [ButtonStyle.Primary]: {
    textColor: Color.Blue600,
  },
  [ButtonStyle.Secondary]: {
    textColor: Color.Gray600,
  },
};

const EnhancedBaseButton = styled(BaseButton)<EnhancedBaseButtonProps>`
  border-width: 0;
  background-color: inherit;

  ${({ styleOf }): FlattenSimpleInterpolation => {
    const textColor = buttonStyleMapping[styleOf].textColor;

    return css`
      color: ${textColor};
      background: transparent;

      :hover {
        background-color: ${transparentize(0.9, textColor)};
      }
    `;
  }}
`;

const TextButton = ({
  children,
  onClick,
  size,
  styleOf,
  disabled,
}: TextButtonProps): JSX.Element => {
  return (
    <EnhancedBaseButton
      data-testid={TEXT_BUTTON_TESTID}
      size={size}
      onClick={disabled ? noop : onClick}
      styleOf={styleOf}
      disabled={disabled}
    >
      {children}
    </EnhancedBaseButton>
  );
};

TextButton.defaultProps = {
  size: ButtonSize.Medium,
  disabled: false,
};

export {
  TextButton,
  ButtonStyle as TextButtonStyle,
  ButtonSize as TextButtonSize,
  TEXT_BUTTON_TESTID,
};
