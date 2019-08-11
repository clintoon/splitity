import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Navbar } from '@web/components/Navbar';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';

describe('<Navbar />', (): void => {
  let wrapper: ShallowWrapper;

  beforeEach((): void => {
    wrapper = shallow(<Navbar />);
  });

  it('renders design <Navbar />', (): void => {
    expect(wrapper.find(DesignNavbar).exists()).toBe(true);
  });
});
