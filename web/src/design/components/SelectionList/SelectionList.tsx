import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';
import { Text, TextStyle } from '@web/design/components/Text/Text';
import { Button, ButtonStyle } from '../Button/Button';
import { noop, isEmpty } from 'lodash';

const ITEM_TESTID = 'selection-list-item';
const LOAD_MORE_SECTION_TESTID = 'selection-list-load-more-section';

interface Item {
  key: string | number;
  text: string;
  onClick: () => void;
}

interface SelectionListProps {
  heading: string;
  items: Item[];
  showLoadMore: boolean;
  onLoadMoreClick: () => void;
  emptyBody?: JSX.Element;
}

const Container = styled.div`
  border: 1px solid ${Color.DarkGray};
  border-radius: 6px;
  max-width: 500px;
  flex-basis: 500px;
  min-height: 200px;
  background-color: ${Color.White};
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
  showLoadMore,
  onLoadMoreClick,
  emptyBody,
}: SelectionListProps): JSX.Element => {
  const renderItems = (): JSX.Element[] => {
    return items.map(
      (val): JSX.Element => {
        return (
          <Item key={val.key} onClick={val.onClick} data-testid={ITEM_TESTID}>
            <TextWrapper>
              <Text styleOf={TextStyle.Title5}>{val.text}</Text>
            </TextWrapper>
          </Item>
        );
      }
    );
  };

  const renderHead = (): JSX.Element => {
    return (
      <Head>
        <TextWrapper>
          <Text styleOf={TextStyle.Title5} color={Color.DarkGray}>
            {heading}
          </Text>
        </TextWrapper>
      </Head>
    );
  };

  const renderBody = (): JSX.Element => {
    if (isEmpty(items) && emptyBody) {
      return emptyBody;
    }
    return (
      <Items>
        {renderItems()}
        {showLoadMore && (
          <LoadMoreSection data-testid={LOAD_MORE_SECTION_TESTID}>
            <Button styleOf={ButtonStyle.Secondary} onClick={onLoadMoreClick}>
              Load more
            </Button>
          </LoadMoreSection>
        )}
      </Items>
    );
  };

  return (
    <Container>
      {renderHead()}
      {renderBody()}
    </Container>
  );
};

SelectionList.defaultProps = {
  showLoadMore: false,
  onLoadMoreClick: noop,
};

export { SelectionList, ITEM_TESTID, LOAD_MORE_SECTION_TESTID };
