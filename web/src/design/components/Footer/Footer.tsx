import React from 'react';
import styled from 'styled-components';
import { Text } from '@web/design/components/Text/Text';
import { Color } from '@web/design/styles/color';
import { Link } from '@web/design/components/Link/Link';

const Container = styled.div`
  display: flex;
  height: 40px;
  background-color: ${Color.Gray300};
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

interface Link {
  id: string;
  text: string;
  to: string;
}

interface FooterProps {
  text: string;
  links: Link[];
}

const LinkWrapper = styled.span`
  margin: 0 0 0 10px;
`;

const Footer = ({ text, links }: FooterProps): JSX.Element => {
  return (
    <Container>
      <Text margin="0 10px 0 0">{text}</Text>
      {links.map(
        (link): JSX.Element => {
          return (
            <LinkWrapper key={link.id}>
              <Link to={link.to}>{link.text}</Link>
            </LinkWrapper>
          );
        }
      )}
    </Container>
  );
};

export { Footer };
