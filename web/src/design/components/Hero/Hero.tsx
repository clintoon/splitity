import React from 'react';
import styled from 'styled-components';
import { Text, TextStyle, TextAs } from '@web/design/components/Text/Text';
import {
  Button,
  ButtonSize,
  ButtonStyle,
} from '@web/design/components/Button/Button';

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundColor: string;
  button?: {
    label: string;
    onClick: (event: React.MouseEvent) => void;
  };
}

interface HeroWrapperProps {
  backgroundColor: string;
}

const HeroWrapper = styled.div<HeroWrapperProps>`
  height: 500px;
  background-color: ${({ backgroundColor }): string => backgroundColor};
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  margin: 0;
`;

const Hero = ({
  title,
  subtitle,
  backgroundColor,
  button,
}: HeroProps): JSX.Element => {
  return (
    <HeroWrapper backgroundColor={backgroundColor}>
      <ContentWrapper>
        <Text as={TextAs.H1} styleOf={TextStyle.Title1}>
          {title}
        </Text>
        <Text as={TextAs.H3} styleOf={TextStyle.Title3}>
          {subtitle}
        </Text>
        {button && (
          <Button
            styleOf={ButtonStyle.Primary}
            size={ButtonSize.Large}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        )}
      </ContentWrapper>
    </HeroWrapper>
  );
};

export { Hero };
