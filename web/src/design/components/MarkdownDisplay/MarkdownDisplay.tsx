import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { fontFamily } from '@web/design/styles/font';

interface MarkdownProps {
  source: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const MarkdownWrapper = styled.div`
  max-width: 900px;
  font: ${fontFamily};
`;

const MarkdownDisplay = ({ source }: MarkdownProps): JSX.Element => {
  return (
    <Container>
      <MarkdownWrapper>
        <ReactMarkdown source={source} />
      </MarkdownWrapper>
    </Container>
  );
};

export { MarkdownDisplay };
