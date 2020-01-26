import React from 'react';
import styled from 'styled-components';
import { Card } from '@web/design/components/Card/Card';
import { Text } from '@web/design/components/Text/Text';
import { Color } from '@web/design/styles/color';

const Container = styled.div`
  max-width: 700px;
  background-color: ${Color.White};
`;

const CardBodyWrapper = styled.div`
  margin: 20px;
`;

const ImgWrapper = styled.div`
  padding: 5px;
`;

const GettingStartedSection = (): JSX.Element => {
  return (
    <Container>
      <Card header="Getting started">
        <CardBodyWrapper>
          <Text>When you have a pull request that you want to split, do:</Text>
          <ImgWrapper>TODO: add img</ImgWrapper>
        </CardBodyWrapper>
      </Card>
    </Container>
  );
};

export { GettingStartedSection };
