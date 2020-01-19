import React from 'react';
import styled from 'styled-components';
import {
  Text,
  TextStyle,
  TextAs,
  TextAlign,
} from '@web/design/components/Text/Text';
import { InfoItem } from './internal/InfoItem';

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
  flex-basis: 800px;
  justify-content: space-evenly;
`;

const InfoGrid = ({ title, color, items }: InfoGridProps): JSX.Element => {
  return (
    <Container color={color}>
      <Text
        styleOf={TextStyle.Title3}
        as={TextAs.H2}
        textAlign={TextAlign.Center}
        margin="0 0 40px 0"
      >
        {title}
      </Text>
      <GridContainer>
        <Grid>
          {items.map(
            (item, index): JSX.Element => {
              return <InfoItem key={index} {...item} />;
            }
          )}
        </Grid>
      </GridContainer>
    </Container>
  );
};

export { InfoGrid };
