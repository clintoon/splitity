import React from 'react';
import styled from 'styled-components';
import { Text, TextAlign, TextStyle } from '@web/design/components/Text/Text';
import { Color } from '@web/design/styles/color';

interface IllustrationDisplayProps {
  img: JSX.Element;
  text?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 120px 0 0 0;
`;

const Box = styled.div`
  flex-basis: 600px;
`;

const IllustrationDisplay = ({
  img,
  text,
}: IllustrationDisplayProps): JSX.Element => {
  return (
    <Container>
      <Box>
        {img}
        {text && (
          <Text
            textAlign={TextAlign.Center}
            styleOf={TextStyle.Title3}
            margin="30px"
            color={Color.Gray600}
          >
            {text}
          </Text>
        )}
      </Box>
    </Container>
  );
};

export { IllustrationDisplay };
