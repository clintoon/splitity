import React from 'react';
import {
  Navbar,
  NAVBAR_RIGHT_ITEMS_TESTID,
  NAVBAR_LEFT_ITEMS_TESTID,
} from '@web/design/components/Navbar/Navbar';
import { render, RenderResult } from '@testing-library/react';
import { logger } from '@web/lib/logger';

jest.mock('@web/lib/logger');

const LEFT_ITEM1_LABEL = 'left-item1-label';
const LEFT_ITEM2_LABEL = 'left-item2-label';
const RIGHT_ITEM1_LABEL = 'right-item1-label';
const RIGHT_ITEM2_LABEL = 'right-item2-label';

interface TestItemProps {
  dataTestId: string;
}

const TestItem = ({ dataTestId }: TestItemProps): JSX.Element => {
  return <div data-testid={dataTestId}></div>;
};

const renderMultipleTestItemsNavbar = (): RenderResult => {
  const rightItem1 = <TestItem key="1" dataTestId={RIGHT_ITEM1_LABEL} />;
  const rightItem2 = <TestItem key="2" dataTestId={RIGHT_ITEM2_LABEL} />;
  const leftItem1 = <TestItem key="3" dataTestId={LEFT_ITEM1_LABEL} />;
  const leftItem2 = <TestItem key="4" dataTestId={LEFT_ITEM2_LABEL} />;

  return render(
    <Navbar
      rightItems={[rightItem1, rightItem2]}
      leftItems={[leftItem1, leftItem2]}
    />
  );
};

describe('<Navbar/>', (): void => {
  it('renders when there are no items', (): void => {
    expect((): void => {
      render(<Navbar />);
    }).not.toThrow();
  });

  it('logs error message when passed item without an key', (): void => {
    // eslint-disable-next-line react/jsx-key
    render(<Navbar rightItems={[<div />]} />);
    expect(logger.error).toHaveBeenCalled();
  });

  it('does not logs error message when passed item with key', (): void => {
    render(<Navbar rightItems={[<div key="1" />]} />);
    expect(logger.error).not.toHaveBeenCalled();
  });

  describe('render multiple items on each side', (): void => {
    it('renders right items in the right container', (): void => {
      const { getByTestId } = renderMultipleTestItemsNavbar();

      expect(getByTestId(NAVBAR_RIGHT_ITEMS_TESTID)).toContainElement(
        getByTestId(RIGHT_ITEM1_LABEL)
      );

      expect(getByTestId(NAVBAR_RIGHT_ITEMS_TESTID)).toContainElement(
        getByTestId(RIGHT_ITEM2_LABEL)
      );
    });

    it('renders right items in the left container', (): void => {
      const { getByTestId } = renderMultipleTestItemsNavbar();

      expect(getByTestId(NAVBAR_LEFT_ITEMS_TESTID)).toContainElement(
        getByTestId(LEFT_ITEM1_LABEL)
      );

      expect(getByTestId(NAVBAR_LEFT_ITEMS_TESTID)).toContainElement(
        getByTestId(LEFT_ITEM2_LABEL)
      );
    });
  });
});
