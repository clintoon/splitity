import styled, { css, CSSProp } from 'styled-components';
import { fontFamily } from '@web/design/styles/font';

export enum BaseButtonSize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

export interface BaseButtonProps {
  size: BaseButtonSize;
}

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

const BaseButton = styled('button')<BaseButtonProps>`
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
`;

export { BaseButton };
