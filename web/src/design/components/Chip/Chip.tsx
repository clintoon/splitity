import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Color } from '@web/design/styles/color';
import { Text } from '@web/design/components/Text/Text';
import { IoIosCloseCircle } from 'react-icons/io';

const CHIP_TESTID = 'chip';
const CHIP_DELETE_BUTTON_TESTID = 'chip delete button';

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
  padding: 0 3px 0 12px;

  ${({ disabled }): FlattenSimpleInterpolation | null => {
    return disabled
      ? null
      : css`
          cursor: pointer;

          :focus,
          :hover {
            background: ${Color.Gray100};
          }
        `;
  }}
`;

const DeleteButton = styled(IoIosCloseCircle)`
  padding: 0;
  margin: 0 0 0 4px;

  :focus,
  :hover {
    fill: ${Color.Gray700};
  }
`;

const Chip = ({
  label,
  onClick,
  borderColor,
  onDelete,
}: ChipProps): JSX.Element => {
  return (
    <Container
      data-testid={CHIP_TESTID}
      disabled={!onClick}
      onClick={onClick}
      borderColor={borderColor || Color.Gray400}
    >
      <Text>{label}</Text>
      {onDelete && (
        <DeleteButton
          data-testid={CHIP_DELETE_BUTTON_TESTID}
          role="button"
          tabIndex={0}
          fill={Color.Gray300}
          size={18}
          onClick={(event): void => {
            event.stopPropagation();
            onDelete();
          }}
        />
      )}
    </Container>
  );
};

export { Chip, CHIP_TESTID, CHIP_DELETE_BUTTON_TESTID };
