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
`;

const MarkdownWrapper = styled.div`
  max-width: 900px;
  font: ${fontFamily};
  padding: 20px;
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
