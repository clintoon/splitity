import React from 'react';
import styled, { FlattenSimpleInterpolation, css } from 'styled-components';
import {
  BaseButton,
  ButtonSize,
  ButtonStyle,
} from '@web/design/components/Button/internal/BaseButton';
import { Color } from '@web/design/styles/color';
import { transparentize } from 'polished';
import { noop } from 'lodash';

const OUTLINE_BUTTON_TESTID = 'outline button';

interface TextButtonProps {
  children: string;
  styleOf: ButtonStyle;
  onClick: () => void;
  size: ButtonSize;
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
  background-color: inherit;

  ${({ styleOf }): FlattenSimpleInterpolation => {
    const textColor = buttonStyleMapping[styleOf].textColor;

    return css`
      border: 2px solid ${textColor};
      color: ${textColor};

      :hover {
        background-color: ${transparentize(0.9, textColor)};
      }
    `;
  }}
`;

const OutlineButton = ({
  size,
  styleOf,
  children,
  onClick,
}: TextButtonProps): JSX.Element => {
  return (
    <EnhancedBaseButton
      data-testid={OUTLINE_BUTTON_TESTID}
      size={size}
      styleOf={styleOf}
      onClick={onClick}
    >
      {children}
    </EnhancedBaseButton>
  );
};

OutlineButton.defaultProps = {
  size: ButtonSize.Medium,
  onClick: noop,
};

export {
  OutlineButton,
  ButtonStyle as OutlineButtonStyle,
  ButtonSize as OutlineButtonSize,
  OUTLINE_BUTTON_TESTID,
};
