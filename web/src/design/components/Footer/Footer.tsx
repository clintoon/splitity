import React from 'react';
import styled from 'styled-components';
import { Text } from '@web/design/components/Text/Text';
import { Color } from '@web/design/styles/color';

const Container = styled.div`
  display: flex;
  height: 40px;
  background-color: ${Color.Gray300};
  justify-content: center;
  align-items: center;
`;

interface FooterProps {
  text: string;
}

const Footer = ({ text }: FooterProps): JSX.Element => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

export { Footer };
