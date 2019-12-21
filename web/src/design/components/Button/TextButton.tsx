import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Color } from '@web/design/styles/color';
import { BaseButton, ButtonSize, ButtonStyle } from './internal/BaseButton';
import { noop } from 'lodash';

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
    textColor: Color.Blue500,
    hoverColor: Color.Blue100,
  },
  [ButtonStyle.Secondary]: {
    textColor: Color.Gray500,
    hoverColor: Color.Gray100,
  },
};

const EnhancedBaseButton = styled(BaseButton)<EnhancedBaseButtonProps>`
  border-width: 0;

  ${({ styleOf }): FlattenSimpleInterpolation => {
    return css`
      color: ${buttonStyleMapping[styleOf].textColor};
      background: transparent;

      :hover {
        background-color: ${buttonStyleMapping[styleOf].hoverColor};
      }
    `;
  }}
`;
// rgba(${buttonStyleMapping[styleOf].hoverColor}, 0.9)
const TextButton = ({
  children,
  onClick,
  size,
  styleOf,
}: TextButtonProps): JSX.Element => {
  return (
    <EnhancedBaseButton size={size} onClick={onClick} styleOf={styleOf}>
      {children}
    </EnhancedBaseButton>
  );
};

TextButton.defaultProps = {
  size: ButtonSize.Medium,
  onClick: noop,
};

export { TextButton, ButtonStyle, ButtonSize };
