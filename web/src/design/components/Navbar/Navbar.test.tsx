import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Navbar } from '@web/design/components/Navbar/Navbar';

describe('<Navbar/>', (): void => {
  let wrapper: ReactWrapper;
  const leftItem1 = <div key="l1">l1</div>;
  const leftItem2 = <div key="l2">l2</div>;
  const rightItem1 = <div key="r1">r1</div>;
  const rightItem2 = <div key="r2">r2</div>;

  beforeEach((): void => {
    wrapper = mount(
      <Navbar
        leftItems={[leftItem1, leftItem2]}
        rightItems={[rightItem1, rightItem2]}
      />
    );
  });

  it('renders leftItems', (): void => {
    expect(wrapper.containsMatchingElement(leftItem1)).toBe(true);
    expect(wrapper.containsMatchingElement(leftItem2)).toBe(true);
  });

  it('renders rightItems', (): void => {
    expect(wrapper.containsMatchingElement(rightItem1)).toBe(true);
    expect(wrapper.containsMatchingElement(rightItem2)).toBe(true);
  });
});
