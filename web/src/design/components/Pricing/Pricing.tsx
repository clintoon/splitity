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
import { Breakpoint } from '@web/design/styles/mediaQuery';

interface PricingProps {
  title: string;
  plans: {
    price: number;
    head: string;
    content: string;
    banner?: string;
  }[];
}

const Wrapper = styled.div`
  margin: 50px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 380px;
  width: 290px;
  background: ${Color.White};
  border: 2px solid ${Color.Gray100};
  margin: 0 10px 10px 0;
  border-radius: 10px;
`;

const Box = styled.div`
  padding: 30px 30px 0 30px;
`;

const Banner = styled.div`
  background: ${Color.Blue100};
  padding: 16px;
  border-radius: 0 0 10px 10px;
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
          ({ price, head, content, banner }, index): JSX.Element => {
            return (
              <PricingContainer key={index}>
                <Box>
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
                  <Text textAlign={TextAlign.Center}>per month</Text>
                </Box>
                {banner && (
                  <Banner>
                    <Text textAlign={TextAlign.Center}>{banner}</Text>
                  </Banner>
                )}
              </PricingContainer>
            );
          }
        )}
      </Container>
    </Wrapper>
  );
};

export { Pricing };
