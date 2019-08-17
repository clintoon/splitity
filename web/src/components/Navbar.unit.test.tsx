import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { NavbarForTest } from '@web/components/Navbar';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { historyFake } from '@web/test/helpers/fakes';

describe('<Navbar />', (): void => {
  let wrapper: ShallowWrapper;

  beforeEach((): void => {
    wrapper = shallow(<NavbarForTest history={historyFake} />);
  });

  it('renders design <Navbar />', (): void => {
    expect(wrapper.find(DesignNavbar).exists()).toBe(true);
  });
});
