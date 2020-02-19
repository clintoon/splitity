import React from 'react';
import styled from 'styled-components';
import {
  Text,
  TextStyle,
  TextAs,
  TextAlign,
} from '@web/design/components/Text/Text';
import { InfoItem } from './internal/InfoItem';
import { Breakpoint } from '@web/design/styles/mediaQuery';

interface InfoGridItem {
  head: string;
  content: string;
}

interface InfoGridProps {
  title: string;
  color: string;
  items: InfoGridItem[];
}

interface ContainerProps {
  color: string;
}

const Container = styled.div<ContainerProps>`
  background-color: ${({ color }): string => color};
  padding: 70px;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: flex;
  max-width: 800px;
  justify-content: space-evenly;

  @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const TextWrapper = styled.div`
  margin: 0 0 40px 0;

  @media (max-width: ${Breakpoint.sm}) {
    margin: 0 0 20px 0;
  }
`;

const ItemWrapper = styled.div`
  @media (max-width: ${Breakpoint.sm}) {
    margin: 0 0 20px 0;
  }
`;

const InfoGrid = ({ title, color, items }: InfoGridProps): JSX.Element => {
  return (
    <Container color={color}>
      <TextWrapper>
        <Text
          styleOf={TextStyle.Title3}
          as={TextAs.H2}
          textAlign={TextAlign.Center}
        >
          {title}
        </Text>
      </TextWrapper>
      <GridContainer>
        <Grid>
          {items.map(
            (item, index): JSX.Element => {
              return (
                <ItemWrapper key={index}>
                  <InfoItem {...item} />
                </ItemWrapper>
              );
            }
          )}
        </Grid>
      </GridContainer>
    </Container>
  );
};

export { InfoGrid };
