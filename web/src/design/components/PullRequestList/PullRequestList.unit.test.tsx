import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  within,
} from '@testing-library/react';
import {
  PullRequestList,
  ITEM_TESTID,
  LOAD_MORE_SECTION_TESTID,
} from '@web/design/components/PullRequestList/PullRequestList';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';

const HEADING = 'heading';
const ITEM_TITLE_TEXT = 'item title text';
const ITEM_REPO_TEXT = 'item repo text';

interface RenderSelectionList {
  renderResult: RenderResult;
  onLoadMoreClickMock: jest.Mock;
  onSelectionClickMock: jest.Mock;
}

interface RenderSelectionListOptions {
  showLoadMore: boolean;
}

const renderSelectionList = (
  options: RenderSelectionListOptions
): RenderSelectionList => {
  const onLoadMoreClickMock = jest.fn();
  const onSelectionClickMock = jest.fn();
  const renderResult = render(
    <PullRequestList
      showLoadMore={options.showLoadMore}
      onLoadMoreClick={onLoadMoreClickMock}
      heading={HEADING}
      items={[
        {
          key: '1',
          title: ITEM_TITLE_TEXT,
          repo: ITEM_REPO_TEXT,
          onClick: onSelectionClickMock,
        },
      ]}
    />
  );
  return { onLoadMoreClickMock, onSelectionClickMock, renderResult };
};

describe('<PullRequestList/>', (): void => {
  it('displays item title label', (): void => {
    const { renderResult } = renderSelectionList({ showLoadMore: false });
    expect(renderResult.container).toHaveTextContent(ITEM_TITLE_TEXT);
  });

  it('displays item repo text', (): void => {
    const { renderResult } = renderSelectionList({ showLoadMore: false });
    expect(renderResult.container).toHaveTextContent(ITEM_REPO_TEXT);
  });

  it('displays heading text', (): void => {
    const { renderResult } = renderSelectionList({ showLoadMore: false });
    expect(renderResult.container).toHaveTextContent(HEADING);
  });

  it('calls onClick when item is pressed', (): void => {
    const { renderResult, onSelectionClickMock } = renderSelectionList({
      showLoadMore: false,
    });
    fireEvent.click(renderResult.getByTestId(ITEM_TESTID));
    expect(onSelectionClickMock).toHaveBeenCalled();
  });

  it('displays loadMore when the showLoadMore prop is true', (): void => {
    const { renderResult } = renderSelectionList({ showLoadMore: true });
    expect(renderResult.container).toHaveTextContent('Load more');
  });

  it('does not displays loadMore when the showLoadMore prop is false', (): void => {
    const { renderResult } = renderSelectionList({ showLoadMore: false });
    expect(renderResult.container).not.toHaveTextContent('Load more');
  });

  it('calls loadMore onClick when loadMore is pressed', (): void => {
    const { renderResult, onLoadMoreClickMock } = renderSelectionList({
      showLoadMore: true,
    });

    fireEvent.click(
      within(renderResult.getByTestId(LOAD_MORE_SECTION_TESTID)).getByTestId(
        BUTTON_TESTID
      )
    );
    expect(onLoadMoreClickMock).toHaveBeenCalled();
  });
});
