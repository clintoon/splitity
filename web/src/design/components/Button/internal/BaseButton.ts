import styled, { css, CSSProp } from 'styled-components';
import { fontFamily } from '@web/design/styles/font';
import { Color } from '@web/design/styles/color';

enum ButtonStyle {
  Primary = 'primary',
  Secondary = 'secondary',
}

enum ButtonSize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

interface BaseButtonProps {
  size: ButtonSize;
}

const buttonSizeMap = {
  s: {
    padding: '6px 10px',
    fontSize: '14px',
  },
  m: {
    padding: '8px 12px',
    fontSize: '20px',
  },
  l: {
    padding: '18px 26px',
    fontSize: '24px',
  },
};

const BaseButton = styled('button')<BaseButtonProps>`
  ${fontFamily};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: none;

  :hover {
    filter: brightness(120%);
  }

  ${({ size }): CSSProp => {
    return css`
      padding: ${buttonSizeMap[size].padding};
      font-size: ${buttonSizeMap[size].fontSize};
    `;
  }}
`;

export { BaseButton, ButtonStyle, ButtonSize };
