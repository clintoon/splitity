import React from 'react';
import styled from 'styled-components';
import { Text } from '@web/design/components/Text/Text';
import { Color } from '@web/design/styles/color';
import { Link } from '@web/design/components/Link/Link';
import { Breakpoint } from '@web/design/styles/mediaQuery';

interface Link {
  id: string;
  text: string;
  to: string;
  external?: boolean;
}

interface FooterProps {
  text: string;
  links: Link[];
}

const Container = styled.div`
  display: flex;
  height: 40px;
  background-color: ${Color.Gray200};
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
    height: auto;
    padding: 10px 0;
  }
`;

const LinkWrapper = styled.span`
  :not(:last-child) {
    margin: 0 10px 0 0;
  }
`;

const LinksSection = styled.div``;

const TextWrapper = styled.div`
  margin: 0 10px 0 0;

  @media (max-width: ${Breakpoint.sm}) {
    margin: 0;
  }
`;

const Footer = ({ text, links }: FooterProps): JSX.Element => {
  return (
    <Container>
      <TextWrapper>
        <Text>{text}</Text>
      </TextWrapper>
      <LinksSection>
        {links.map(
          (link): JSX.Element => {
            return (
              <LinkWrapper key={link.id}>
                <Link to={link.to} external={link.external}>
                  {link.text}
                </Link>
              </LinkWrapper>
            );
          }
        )}
      </LinksSection>
    </Container>
  );
};

export { Footer };
