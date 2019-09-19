import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';
import { Text, TextStyle } from '@web/design/components/Text/Text';
import { Button, ButtonStyle, ButtonSize } from '../Button/Button';

interface Item {
  key: string | number;
  text: string;
  onClick: () => void;
}

interface SelectionListProps {
  heading: string;
  items: Item[];
  onLoadMoreClick?: () => void;
}

const Container = styled.div`
  border: 1px solid ${Color.DarkGray};
  border-radius: 6px;
  max-width: 500px;
`;

const Head = styled.div`
  border-bottom: 1px solid ${Color.DarkGray};
`;

const Items = styled.div`
  & > :not(:last-child) {
    border-bottom: 1px solid ${Color.Gray};
  }
`;

const TextWrapper = styled.div`
  padding: 10px;
`;

const LoadMoreSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0 8px 0;
`;

const Item = styled.div`
  cursor: pointer;
  :hover {
    background-color: ${Color.LightGray};
  }
`;

const SelectionList = ({
  heading,
  items,
  onLoadMoreClick,
}: SelectionListProps): JSX.Element => {
  const renderItems = (): JSX.Element[] => {
    return items.map(
      (val): JSX.Element => {
        return (
          <Item key={val.key} onClick={val.onClick}>
            <TextWrapper>
              <Text styleOf={TextStyle.Title5}>{val.text}</Text>
            </TextWrapper>
          </Item>
        );
      }
    );
  };

  let headContent: JSX.Element | undefined = undefined;
  if (heading) {
    headContent = (
      <Head>
        <TextWrapper>
          <Text styleOf={TextStyle.Title5} color={Color.DarkGray}>
            {heading}
          </Text>
        </TextWrapper>
      </Head>
    );
  }

  return (
    <Container>
      {headContent}
      <Items>
        {renderItems()}
        {onLoadMoreClick && (
          <LoadMoreSection>
            <Button styleOf={ButtonStyle.Secondary}>Load more</Button>
          </LoadMoreSection>
        )}
      </Items>
    </Container>
  );
};

export { SelectionList };
