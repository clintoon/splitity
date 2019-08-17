import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { NavbarForTest } from '@web/components/Navbar';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { History, createMemoryHistory } from 'history';

describe('<Navbar />', (): void => {
  let wrapper: ShallowWrapper;
  let history: History;

  beforeEach((): void => {
    history = createMemoryHistory();
    wrapper = shallow(<NavbarForTest history={history} />);
  });

  it('renders design <Navbar />', (): void => {
    expect(wrapper.find(DesignNavbar).exists()).toBe(true);
  });
});
