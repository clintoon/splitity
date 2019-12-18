import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';

interface ChipArrayProps {
  children: JSX.Element[];
}

const ChipContainer = styled.div`
  overflow-x: wrap;
  background-color: ${Color.Gray50};
  padding: 8px 4px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px ${Color.Gray200};

  & > * {
    margin: 3px 4px;
  }
`;

const ChipArray = ({ children }: ChipArrayProps): JSX.Element => {
  return <ChipContainer>{children}</ChipContainer>;
};

export { ChipArray };
