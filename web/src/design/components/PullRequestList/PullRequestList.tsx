import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';
import { Text, TextStyle } from '@web/design/components/Text/Text';
import { Button, ButtonStyle } from '../Button/Button';
import { noop, isEmpty } from 'lodash';

const ITEM_TESTID = 'pull-request-item';
const LOAD_MORE_SECTION_TESTID = 'pull-request-list-load-more-section';

export interface PullRequestItem {
  key: string | number;
  title: string;
  repo: string;
  onClick: () => void;
}

interface PullRequestListProps {
  heading: string;
  items: PullRequestItem[];
  showLoadMore: boolean;
  onLoadMoreClick: () => void;
  emptyBody?: JSX.Element;
}

const Container = styled.div`
  border: 1px solid ${Color.Gray700};
  border-radius: 6px;
  max-width: 500px;
  flex-basis: 500px;
  min-height: 200px;
  background-color: ${Color.White};
`;

const Head = styled.div`
  border-bottom: 1px solid ${Color.Gray700};
`;

const Items = styled.div`
  & > :not(:last-child) {
    border-bottom: 1px solid ${Color.Gray500};
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
    background-color: ${Color.Gray200};
  }
`;

const PullRequestList = ({
  heading,
  items,
  showLoadMore,
  onLoadMoreClick,
  emptyBody,
}: PullRequestListProps): JSX.Element => {
  const renderItems = (): JSX.Element[] => {
    return items.map(
      (val): JSX.Element => {
        return (
          <Item key={val.key} onClick={val.onClick} data-testid={ITEM_TESTID}>
            <TextWrapper>
              <Text styleOf={TextStyle.Title5}>{val.title}</Text>
              <Text>{val.repo}</Text>
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
          <Text styleOf={TextStyle.Title5} color={Color.Gray700}>
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

PullRequestList.defaultProps = {
  showLoadMore: false,
  onLoadMoreClick: noop,
};

export { PullRequestList, ITEM_TESTID, LOAD_MORE_SECTION_TESTID };
