import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  within,
} from '@testing-library/react';
import {
  SelectionList,
  ITEM_TESTID,
  LOAD_MORE_SECTION_TESTID,
} from '@web/design/components/SelectionList/SelectionList';
import { BUTTON_TESTID } from '../Button/Button';

const HEADING = 'heading';
const SELECTION_TEXT = 'selection text';

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
    <SelectionList
      showLoadMore={options.showLoadMore}
      onLoadMoreClick={onLoadMoreClickMock}
      heading={HEADING}
      items={[
        {
          key: '1',
          text: SELECTION_TEXT,
          onClick: onSelectionClickMock,
        },
      ]}
    />
  );
  return { onLoadMoreClickMock, onSelectionClickMock, renderResult };
};

describe('<SelectionList/>', (): void => {
  it('displays selection button label', (): void => {
    const { renderResult } = renderSelectionList({ showLoadMore: false });
    expect(renderResult.container).toHaveTextContent(SELECTION_TEXT);
  });

  it('displays heading text', (): void => {
    const { renderResult } = renderSelectionList({ showLoadMore: false });
    expect(renderResult.container).toHaveTextContent(HEADING);
  });

  it('calls onClick when selection button is pressed', (): void => {
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