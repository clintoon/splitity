import React from 'react';
import {
  Navbar,
  NAVBAR_RIGHT_ITEMS,
  NAVBAR_LEFT_ITEMS,
} from '@web/design/components/Navbar/Navbar';
import { render, RenderResult } from '@testing-library/react';
import { logError } from '@web/lib/logger';

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
    expect(logError).toHaveBeenCalled();
  });

  it('does not logs error message when passed item with key', (): void => {
    render(<Navbar rightItems={[<div key="1" />]} />);
    expect(logError).not.toHaveBeenCalled();
  });

  describe('render multiple items on each side', (): void => {
    it('renders right items in the right container', (): void => {
      const { getByTestId } = renderMultipleTestItemsNavbar();

      expect(getByTestId(NAVBAR_RIGHT_ITEMS)).toContainElement(
        getByTestId(RIGHT_ITEM1_LABEL)
      );

      expect(getByTestId(NAVBAR_RIGHT_ITEMS)).toContainElement(
        getByTestId(RIGHT_ITEM2_LABEL)
      );
    });

    it('renders right items in the left container', (): void => {
      const { getByTestId } = renderMultipleTestItemsNavbar();

      expect(getByTestId(NAVBAR_LEFT_ITEMS)).toContainElement(
        getByTestId(LEFT_ITEM1_LABEL)
      );

      expect(getByTestId(NAVBAR_LEFT_ITEMS)).toContainElement(
        getByTestId(LEFT_ITEM2_LABEL)
      );
    });
  });
});

// describe('<Navbar/>', (): void => {
//   afterEach((): void => {
//     jest.resetAllMocks();
//   });

//   describe('component', (): void => {
//     let wrapper: ShallowWrapper;
//     const leftItem1 = <div key="l1">l1</div>;
//     const leftItem2 = <div key="l2">l2</div>;
//     const rightItem1 = <div key="r1">r1</div>;
//     const rightItem2 = <div key="r2">r2</div>;
//     beforeEach((): void => {
//       wrapper = shallow(
//         <Navbar
//           leftItems={[leftItem1, leftItem2]}
//           rightItems={[rightItem1, rightItem2]}
//         />
//       );
//     });

//     it('renders leftItems', (): void => {
//       expect(wrapper.containsMatchingElement(leftItem1)).toBe(true);
//       expect(wrapper.containsMatchingElement(leftItem2)).toBe(true);
//     });

//     it('renders rightItems', (): void => {
//       expect(wrapper.containsMatchingElement(rightItem1)).toBe(true);
//       expect(wrapper.containsMatchingElement(rightItem2)).toBe(true);
//     });
//   });

//   describe('renderItems()', (): void => {
//     let consoleErrorMock: jest.SpyInstance;

//     beforeEach((): void => {
//       consoleErrorMock = jest.spyOn(console, 'error');
//     });

//     it('returns null when items not passed in', (): void => {
//       expect(renderItemsForTest()).toBe(null);
//     });

//     it('returns not null when items is passed in', (): void => {
//       expect(renderItemsForTest([<div key="key" />])).not.toBe(null);
//     });

//     it("doesn't log error items is valid", (): void => {
//       renderItemsForTest([<div key="key" />]);
//       expect(consoleErrorMock).not.toHaveBeenCalled();
//     });

//     it("logs error when key isn't passed in", (): void => {
//       // eslint-disable-next-line react/jsx-key
//       renderItemsForTest([<div />]);
//       expect(consoleErrorMock).toHaveBeenCalledTimes(1);
//     });
//   });
// });
