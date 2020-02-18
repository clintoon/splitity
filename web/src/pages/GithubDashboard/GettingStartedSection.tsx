import React from 'react';
import styled from 'styled-components';
import { Card } from '@web/design/components/Card/Card';
import { Text } from '@web/design/components/Text/Text';
import { Color } from '@web/design/styles/color';
import howToSplitImg from '@web/assets/images/how_to_split.png';

const Container = styled.div`
  max-width: 700px;
  background-color: ${Color.White};
`;

const CardBodyWrapper = styled.div`
  margin: 20px;
`;

const ImgWrapper = styled.div`
  padding: 5px;
  img {
    width: 650px;
  }
`;

const GettingStartedSection = (): JSX.Element => {
  return (
    <Container>
      <Card header="Getting started">
        <CardBodyWrapper>
          <Text>
            To get started, comment the below on one of your pull requests to
            get started
          </Text>
          <ImgWrapper>
            <img alt="how to" src={howToSplitImg} />
          </ImgWrapper>
        </CardBodyWrapper>
      </Card>
    </Container>
  );
};

export { GettingStartedSection };
