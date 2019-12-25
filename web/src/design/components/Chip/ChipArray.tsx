import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';

interface ChipArrayProps {
  children: JSX.Element[];
  className?: string;
}

const ChipContainer = styled.div`
  overflow-x: wrap;
  padding: 8px 4px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px ${Color.Gray50};
  overflow-y: scroll;

  & > * {
    margin: 3px 4px;
  }
`;

const ChipArray = ({ children, className }: ChipArrayProps): JSX.Element => {
  return <ChipContainer className={className}>{children}</ChipContainer>;
};

export { ChipArray };
