import React from 'react';
import styled from 'styled-components';
import {
  Text,
  TextStyle,
  TextAs,
  TextAlign,
} from '@web/design/components/Text/Text';
import {
  Button,
  ButtonSize,
  ButtonStyle,
} from '@web/design/components/Button/Button';
import { Breakpoint } from '@web/design/styles/mediaQuery';

const HERO_TESTID = 'hero';
const HERO_TITLE_TESTID = 'hero-title';
const HERO_SUBTITLE_TESTID = 'hero-subtitle';

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundColor: string;
  button?: {
    label: string;
    onClick: (event: React.MouseEvent) => void;
  };
  body: JSX.Element;
}

interface HeroWrapperProps {
  backgroundColor: string;
}

const HeroWrapper = styled.div<HeroWrapperProps>`
  padding: 80px 0;
  width: 100%;
  background-color: ${({ backgroundColor }): string => backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BodyWrapper = styled.div`
  margin: 40px 0 0 0;
  width: 90%;
  height: 90%;

  @media (min-width: ${Breakpoint.lg}) {
    width: 60%;
    height: 60%;
  }
`;

const Hero = ({
  title,
  subtitle,
  backgroundColor,
  button,
  body,
}: HeroProps): JSX.Element => {
  return (
    <HeroWrapper data-testid={HERO_TESTID} backgroundColor={backgroundColor}>
      <div data-testid={HERO_TITLE_TESTID}>
        <Text
          as={TextAs.H1}
          styleOf={TextStyle.Title1}
          textAlign={TextAlign.Center}
        >
          {title}
        </Text>
      </div>
      <div data-testid={HERO_SUBTITLE_TESTID}>
        <Text
          as={TextAs.H3}
          styleOf={TextStyle.Title3}
          textAlign={TextAlign.Center}
          margin="0 0 20px 0"
        >
          {subtitle}
        </Text>
      </div>
      {button && (
        <ButtonWrapper>
          <Button
            styleOf={ButtonStyle.Primary}
            size={ButtonSize.Large}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        </ButtonWrapper>
      )}
      <BodyWrapper>{body}</BodyWrapper>
    </HeroWrapper>
  );
};

export { Hero, HERO_TITLE_TESTID, HERO_SUBTITLE_TESTID, HERO_TESTID };
