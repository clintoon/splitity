import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';
import { Text } from '@web/design/components/Text/Text';

interface CardProps {
  header: string;
  children: JSX.Element;
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  height: 50px;
  background-color: ${Color.Gray};
  border-radius: 5px 5px 0 0;
  align-items: center;
`;

const HeaderText = styled.div`
  margin: 0 20px;
`;

const Body = styled.div`
  border-radius: 0 0 5px 5px;
  border: 2px solid ${Color.LightGray};
  border-top: 0;
`;

const Card = ({ header, children }: CardProps): JSX.Element => {
  return (
    <Container>
      <Header>
        <HeaderText>
          <Text>{header}</Text>
        </HeaderText>
      </Header>
      <Body>{children}</Body>
    </Container>
  );
};

export { Card };
