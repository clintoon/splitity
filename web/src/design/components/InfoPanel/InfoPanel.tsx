import React from 'react';
import styled from 'styled-components';
import { Text, TextStyle, TextAs } from '@web/design/components/Text/Text';

interface ContainerProps {
  color: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  height: 500px;
  background-color: ${({ color }): string => color};
  justify-content: center;
`;

interface InfoPanelProps {
  title: string;
  bulletPoints: string[];
  color: string;
  illustration: JSX.Element;
}

const InfoSection = styled.div`
  width: 450px;
  margin: 60px 50px 0 0;
`;
const IllustrationSection = styled.div`
  display: flex;
  width: 450px;
  margin: 0 0 0 50px;
  justify-content: center;
  align-items: center;
`;

const InfoPanel = ({
  color,
  title,
  bulletPoints,
  illustration,
}: InfoPanelProps): JSX.Element => {
  return (
    <Container color={color}>
      <InfoSection>
        <Text styleOf={TextStyle.Title2} as={TextAs.H2} margin="0 0 20px 0">
          {title}
        </Text>
        {bulletPoints.map(
          (bulletPoint, index): JSX.Element => {
            return (
              <Text styleOf={TextStyle.Title5} key={index} margin="0 0 20px 0">
                {bulletPoint}
              </Text>
            );
          }
        )}
      </InfoSection>
      <IllustrationSection>{illustration}</IllustrationSection>
    </Container>
  );
};

export { InfoPanel };
