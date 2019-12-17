import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Color } from '@web/design/styles/color';
import { Text } from '@web/design/components/Text/Text';

interface ChipProps {
  label: string;
  onClick?: () => void;
  onDelete?: () => void;
  borderColor?: string;
}

interface ContainerProps {
  disabled: boolean;
  borderColor: string;
}

const Container = styled.button<ContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.White};
  border: 2px solid ${({ borderColor }): string => borderColor};
  min-width: 55px;
  height: 30px;
  border-radius: 50px;

  ${({ disabled }): FlattenSimpleInterpolation | null => {
    return disabled
      ? null
      : css`
          cursor: pointer;
        `;
  }}
`;

const Chip = ({ label, onClick, borderColor }: ChipProps): JSX.Element => {
  return (
    <Container
      disabled={!onClick}
      onClick={onClick}
      borderColor={borderColor || Color.Gray400}
    >
      <Text>{label}</Text>
    </Container>
  );
};

export { Chip };
