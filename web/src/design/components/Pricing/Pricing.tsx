import React from 'react';
import styled from 'styled-components';
import {
  Text,
  TextStyle,
  TextAs,
  TextAlign,
  TextWeight,
} from '@web/design/components/Text/Text';
import { Color } from '@web/design/styles/color';

interface PricingProps {
  title: string;
  plans: {
    price: number;
    head: string;
    content: string;
  }[];
}

const Wrapper = styled.div`
  margin: 50px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  height: 300px;
  width: 230px;
  padding: 30px;
  background: ${Color.White};
  border: 2px solid ${Color.Gray100};
  margin: 0 10px 10px 0;
  border-radius: 10px;
`;

const Pricing = ({ title, plans }: PricingProps): JSX.Element => {
  return (
    <Wrapper>
      <Text
        styleOf={TextStyle.Title2}
        as={TextAs.H2}
        textAlign={TextAlign.Center}
        margin="30px 0"
      >
        {title}
      </Text>
      <Container>
        {plans.map(
          ({ price, head, content }, index): JSX.Element => {
            return (
              <Box key={index}>
                <Text
                  textAlign={TextAlign.Center}
                  margin="30px 0"
                  fontWeight={TextWeight.Bold}
                >
                  {head}
                </Text>
                <Text textAlign={TextAlign.Center} margin="10px 0">
                  {content}
                </Text>
                <Text
                  styleOf={TextStyle.Title1}
                  textAlign={TextAlign.Center}
                  margin="30px 0"
                >
                  ${price}
                </Text>
                <Text textAlign={TextAlign.Center} margin="10px 0">
                  per month
                </Text>
              </Box>
            );
          }
        )}
      </Container>
    </Wrapper>
  );
};

export { Pricing };
